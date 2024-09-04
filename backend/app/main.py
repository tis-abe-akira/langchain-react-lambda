from fastapi import FastAPI, Security, HTTPException
from fastapi.security import APIKeyHeader
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from langchain_aws import BedrockChat
from langchain_core.output_parsers import StrOutputParser
import os

app = FastAPI()

API_KEY = os.environ.get("API_KEY")
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

async def get_api_key(api_key_header: str = Security(api_key_header)):
    if api_key_header == API_KEY:
        return api_key_header
    raise HTTPException(status_code=403, detail="Could not validate API KEY")


class RequestBody(BaseModel):
    question: str

def bedrock_stream(question: str):

    model = BedrockChat(
        model_id="anthropic.claude-3-5-sonnet-20240620-v1:0",
        model_kwargs={"max_tokens": 1000},
    )

    chain = model | StrOutputParser()

    for chunk in chain.stream(question):
        yield chunk

@app.post("/api/qa", dependencies=[Security(get_api_key)])
async def api_qa(body: RequestBody):

    return StreamingResponse(
        bedrock_stream(body.question),
        media_type="text/event-stream",
    )

@app.get("/api/health-check", dependencies=[Security(get_api_key)])
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
