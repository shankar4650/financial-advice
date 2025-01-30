from pydantic import BaseModel
from typing import Optional

class StockResponse(BaseModel):
    symbol: str
    recommendation: str
    charts: str

class StockRequest(BaseModel):
    symbol: str
    period: Optional[str] = "5y"
