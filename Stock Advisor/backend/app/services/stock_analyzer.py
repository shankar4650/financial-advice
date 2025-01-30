import yfinance as yf
import pandas as pd
import ta
import plotly.graph_objects as go
from datetime import datetime, timedelta

class StockAnalyzer:
    def __init__(self, symbol: str):
        self.symbol = symbol
        self.stock = yf.Ticker(symbol)
        self.df = self._get_historical_data()
        
    def _get_historical_data(self):
        end_date = datetime.now()
        start_date = end_date - timedelta(days=5*365)
        df = self.stock.history(start=start_date, end=end_date)
        
        # Calculate technical indicators
        df['SMA_20'] = ta.trend.sma_indicator(df['Close'], window=20)
        df['EMA_20'] = ta.trend.ema_indicator(df['Close'], window=20)
        df['RSI'] = ta.momentum.rsi(df['Close'], window=14)
        
        # MACD
        macd = ta.trend.MACD(df['Close'])
        df['MACD'] = macd.macd()
        df['MACD_Signal'] = macd.macd_signal()
        
        # Bollinger Bands
        bollinger = ta.volatility.BollingerBands(df['Close'])
        df['BB_High'] = bollinger.bollinger_hband()
        df['BB_Low'] = bollinger.bollinger_lband()
        
        return df
    
    def get_recommendation(self):
        last_row = self.df.iloc[-1]
        signals = []
        
        # RSI signals
        if last_row['RSI'] < 30:
            signals.append(1)
        elif last_row['RSI'] > 70:
            signals.append(-1)
        else:
            signals.append(0)
            
        # MACD signals
        if last_row['MACD'] > last_row['MACD_Signal']:
            signals.append(1)
        elif last_row['MACD'] < last_row['MACD_Signal']:
            signals.append(-1)
        else:
            signals.append(0)
            
        # Moving Average signals
        if last_row['Close'] > last_row['SMA_20']:
            signals.append(1)
        elif last_row['Close'] < last_row['SMA_20']:
            signals.append(-1)
        else:
            signals.append(0)
            
        avg_signal = sum(signals) / len(signals)
        
        if avg_signal > 0.3:
            return "Good time to buy"
        elif avg_signal < -0.3:
            return "Good time to sell"
        else:
            return "Good time to hold"
    
    def generate_charts(self):
        fig = go.Figure()
        
        fig.add_trace(go.Candlestick(
            x=self.df.index,
            open=self.df['Open'],
            high=self.df['High'],
            low=self.df['Low'],
            close=self.df['Close'],
            name='OHLC'
        ))
        
        fig.add_trace(go.Scatter(
            x=self.df.index, 
            y=self.df['SMA_20'], 
            name='SMA 20',
            line=dict(color='blue')
        ))
        
        fig.add_trace(go.Scatter(
            x=self.df.index, 
            y=self.df['EMA_20'], 
            name='EMA 20',
            line=dict(color='orange')
        ))
        
        fig.update_layout(
            title=f'{self.symbol} Stock Analysis',
            yaxis_title='Stock Price (USD)',
            template='plotly_dark',
            showlegend=True
        )
        
        return fig.to_json()
