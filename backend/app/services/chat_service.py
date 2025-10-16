from app.core.groq_client import client

def get_bot_response(user_message: str) -> str:
    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": user_message.lower()}],
        model="llama-3.3-70b-versatile",
        stream=False,
    )
    return chat_completion.choices[0].message.content
