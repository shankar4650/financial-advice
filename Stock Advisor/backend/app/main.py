from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.stock_router import router

app = FastAPI(title="Stock Advisor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/v1")
