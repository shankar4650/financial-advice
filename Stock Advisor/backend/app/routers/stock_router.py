from fastapi import APIRouter, HTTPException
from app.services.stock_analyzer import StockAnalyzer
from app.models.stock_models import StockResponse

router = APIRouter()

@router.get("/analyze/{symbol}", response_model=StockResponse)
async def analyze_stock(symbol: str):
    try:
        analyzer = StockAnalyzer(symbol)
        return StockResponse(
            symbol=symbol,
            recommendation=analyzer.get_recommendation(),
            charts=analyzer.generate_charts()
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
