from pydantic import BaseModel

class ExtractRequest(BaseModel):
    text: str

class ExtractResponse(BaseModel):
    entities: dict

class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    answer: str