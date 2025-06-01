
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ProtocolData, YieldPrediction } from '../../data/mockData';

interface YieldComparisonTableProps {
  data: ProtocolData[];
  predictions: YieldPrediction[];
}

const YieldComparisonTable: React.FC<YieldComparisonTableProps> = ({ data, predictions }) => {
  const getPredictionForProtocol = (protocolName: string) => {
    return predictions.find(p => p.protocol === protocolName);
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'border-green-500/50 text-green-300';
      case 'Medium': return 'border-yellow-500/50 text-yellow-300';
      case 'High': return 'border-red-500/50 text-red-300';
      default: return 'border-gray-500/50 text-gray-300';
    }
  };

  return (
    <div className="space-y-4">
      {data.map((protocol) => {
        const prediction = getPredictionForProtocol(protocol.name);
        const yieldChange = prediction ? prediction.predictedYield - protocol.currentYield : 0;
        
        return (
          <div
            key={protocol.name}
            className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{protocol.logo}</span>
                <div>
                  <h3 className="text-white font-semibold">{protocol.name}</h3>
                  <p className="text-sm text-purple-200">{protocol.category}</p>
                </div>
              </div>
              <Badge variant="outline" className={getRiskColor(protocol.riskLevel)}>
                {protocol.riskLevel} Risk
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-purple-300">Current Yield</p>
                <p className="text-lg font-bold text-white">{protocol.currentYield.toFixed(2)}%</p>
              </div>
              
              <div>
                <p className="text-xs text-purple-300">24h Change</p>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(protocol.change24h)}
                  <span className={`text-lg font-bold ${
                    protocol.change24h > 0 ? 'text-green-400' : 
                    protocol.change24h < 0 ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {protocol.change24h > 0 ? '+' : ''}{protocol.change24h.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-purple-300">TVL</p>
                <p className="text-lg font-bold text-white">
                  ${(protocol.tvl / 1_000_000).toFixed(1)}M
                </p>
              </div>

              {prediction && (
                <div>
                  <p className="text-xs text-purple-300">Predicted ({prediction.timeframe})</p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg font-bold ${
                      yieldChange > 0 ? 'text-green-400' : 
                      yieldChange < 0 ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {prediction.predictedYield.toFixed(2)}%
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        prediction.confidence > 0.8 ? 'border-green-500/50 text-green-300' : 
                        prediction.confidence > 0.6 ? 'border-yellow-500/50 text-yellow-300' :
                        'border-red-500/50 text-red-300'
                      }`}
                    >
                      {Math.round(prediction.confidence * 100)}%
                    </Badge>
                  </div>
                </div>
              )}
            </div>

            {prediction && (
              <div className="mt-3 p-2 bg-black/30 rounded text-xs text-purple-200">
                <strong>AI Insight:</strong> {prediction.reasoning[0]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default YieldComparisonTable;
