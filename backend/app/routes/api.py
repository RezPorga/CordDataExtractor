from fastapi import APIRouter, UploadFile, File
from PIL import Image
import io
from app.schemas.models import QueryRequest
from app.services.layoutlm_service import extract_from_document
from app.services.qa_service import answer_question

router = APIRouter()

# store extracted data temporarily
DOCUMENT_STORE = {}


@router.post("/extract")
async def extract(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    data = extract_from_document(image)

    DOCUMENT_STORE["data"] = data  # store in memory

    return {"entities": data}


@router.post("/query")
async def query(req: QueryRequest):
    data = DOCUMENT_STORE.get("data", {})

    answer = answer_question(req.question, data)

    return {"answer": answer}