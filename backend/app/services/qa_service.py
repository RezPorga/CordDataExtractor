import os
import json
from openai import OpenAI

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=os.getenv("OPENROUTER_API_KEY"), # Make sure this matches your .env
)
def answer_question(question: str, data: dict):
    context = json.dumps(data, indent=2)

    prompt = f"""
You are an AI assistant.

Use ONLY the structured data below to answer.

Data:
{context}

Question:
{question}

Answer:
"""

    response = client.chat.completions.create(
        model="stepfun/step-3.5-flash:free", # Using the free StepFun model ID
        messages=[
            {"role": "user", "content": prompt}
        ],
    )

    return response.choices[0].message.content
