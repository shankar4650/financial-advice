import React from 'react';
import { LoadingSpinnerProps } from '../types';

const quotes = [
    "Buy low, sell high",
    "Markets can remain irrational longer than you can remain solvent",
    "Time in the market beats timing the market",
];

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ quote }) => {
    const randomQuote = quote || quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <div className="flex flex-col items-center justify-center space-y-8">
            <div className="relative">
                <div className="w-24 h-24 border-4 border-blue-200 rounded-full animate-spin border-t-transparent" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
            </div>
            <p className="text-gray-400 text-center max-w-md italic">{randomQuote}</p>
        </div>
    );
};

export default LoadingSpinner;
