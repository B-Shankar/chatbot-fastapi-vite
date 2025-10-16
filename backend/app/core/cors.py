from fastapi.middleware.cors import CORSMiddleware

def setup_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],        # Adjust in production
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True
    )
