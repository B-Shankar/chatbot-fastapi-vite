# Upgrade pip
pip install --upgrade pip

# Install FastAPI with all standard dependencies
pip install "fastapi[standard]"

# Install Groq
pip install groq

# Save dependencies
pip freeze > requirements.txt


# Run from project root (recommended) (backend> )
fastapi dev app/main.py

# Run from within the app directory (backend\app> )
uvicorn main:app --reload