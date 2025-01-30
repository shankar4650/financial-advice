import React from 'react';
import Plot from 'react-plotly.js';
import { ChartProps } from '../types';

const StockChart: React.FC<ChartProps> = ({ data }) => {
    const chartData = JSON.parse(data.charts);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Analysis for {data.symbol}</h2>
                <div className={`
                    text-xl font-semibold p-4 rounded-lg
                    ${data.recommendation.includes('buy') ? 'bg-green-500/20 text-green-400' : 
                      data.recommendation.includes('sell') ? 'bg-red-500/20 text-red-400' : 
                      'bg-yellow-500/20 text-yellow-400'}
                `}>
                    {data.recommendation}
                </div>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm">
                <Plot
                    data={chartData.data}
                    layout={{
                        ...chartData.layout,
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        autosize: true,
                        margin: { t: 40, r: 20, l: 40, b: 40 },
                        font: { color: '#fff' },
                        xaxis: { ...chartData.layout.xaxis, gridcolor: '#1f2937' },
                        yaxis: { ...chartData.layout.yaxis, gridcolor: '#1f2937' }
                    }}
                    useResizeHandler={true}
                    style={{width: "100%", height: "600px"}}
                    config={{ responsive: true }}
                />
            </div>
        </div>
    );
};

export default StockChart;
