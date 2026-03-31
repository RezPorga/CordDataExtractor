from transformers import LayoutLMv3Processor, LayoutLMv3ForTokenClassification
from PIL import Image
import torch

REPO_ID = "asimashan/CordDataExtractor-Model"

device = "cuda" if torch.cuda.is_available() else "cpu"

processor = LayoutLMv3Processor.from_pretrained("microsoft/layoutlmv3-base")
model = LayoutLMv3ForTokenClassification.from_pretrained(REPO_ID)

model.to(device)
model.eval()


def extract_from_document(image: Image.Image):
    encoding = processor(image, return_tensors="pt").to(device)

    with torch.no_grad():
        outputs = model(**encoding)

    logits = outputs.logits
    predictions = logits.argmax(-1).squeeze().tolist()

    tokens = processor.tokenizer.convert_ids_to_tokens(
        encoding["input_ids"].squeeze().tolist()
    )

    results = []
    for token, pred in zip(tokens, predictions):
        results.append({
            "token": token,
            "label": int(pred)
        })

    return postprocess(results, model.config.id2label)


def postprocess(predictions, id2label):
    structured = {}

    for item in predictions:
        label = id2label[item["label"]]
        token = item["token"].replace("Ġ", "").strip()

        if token in ["", "<s>", "</s>", "<pad>"]:
            continue

        # split label into hierarchy
        parts = label.split(".")
        current = structured

        for part in parts[:-1]:
            current = current.setdefault(part, {})

        last = parts[-1]

        if last not in current:
            current[last] = token
        else:
            current[last] += " " + token

    return structured