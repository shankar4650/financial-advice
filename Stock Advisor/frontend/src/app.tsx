import React, { useState } from 'react';
import axios from 'axios';
import StockChart from './components/StockChart';
import LoadingSpinner from './components/LoadingSpinner';
import { StockData } from './types';

const App: React.FC = () => {
    const [symbol, setSymbol] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<StockData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const analyzeStock = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.get<StockData>(`http://localhost:8000/api/v1/analyze/${symbol}`);
            setData(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Stock Market Advisor
                </h1>
                
                <form onSubmit={analyzeStock} className="max-w-md mx-auto mb-8">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                            placeholder="Enter stock symbol (e.g., AAPL)"
                            className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-blue-500 backdrop-blur-sm"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            disabled={loading || !symbol}
                        >
                            Analyze
                        </button>
                    </div>
                </form>

                {loading && <LoadingSpinner />}

                {error && (
                    <div className="text-red-500 text-center mb-4 p-4 bg-red-500/10 rounded-lg">
                        {error}
                    </div>
                )}

                {data && <StockChart data={data} />}
            </div>
        </div>
    );
};

export default App;
