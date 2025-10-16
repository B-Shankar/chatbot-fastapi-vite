from fastapi import APIRouter
from app.models.chat_request import ChatRequest
from app.services.chat_service import get_bot_response

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/", summary="Chat with Groq model")
async def chat(request: ChatRequest):
    reply = get_bot_response(request.message)
    return {"reply": reply}
