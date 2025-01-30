export interface StockData {
    symbol: string;
    recommendation: string;
    charts: string;
}

export interface ChartProps {
    data: StockData;
}

export interface LoadingSpinnerProps {
    quote?: string;
}
