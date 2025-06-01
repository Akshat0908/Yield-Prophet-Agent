
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, TrendingDown } from 'lucide-react';
import { YieldPrediction } from '../../data/mockData';

interface PredictionOrbProps {
  prediction: YieldPrediction;
  isRevealing: boolean;
  mysticalEnergy: number;
}

const PredictionOrb: React.FC<PredictionOrbProps> = ({ prediction, isRevealing, mysticalEnergy }) => {
  const yieldChange = prediction.predictedYield - prediction.currentYield;
  const isPositive = yieldChange > 0;

  return (
    <div className="relative">
      {/* Crystal Ball Container */}
      <div className={`relative w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400/20 via-purple-500/30 to-pink-400/20 border-2 border-cyan-400/50 shadow-2xl ${
        isRevealing ? 'animate-pulse' : ''
      }`}>
        {/* Inner Glow */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-400/10 via-cyan-400/20 to-pink-400/10 backdrop-blur-sm"></div>
        
        {/* Mystical Energy Swirls */}
        <div className="absolute inset-4 rounded-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-spin" style={{ animationDuration: '8s' }}></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-l from-transparent via-cyan-300/20 to-transparent animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
        </div>

        {/* Prediction Content */}
        {!isRevealing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <div className="text-sm text-cyan-200 mb-1">{prediction.protocol}</div>
            
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl font-bold text-white">
                {prediction.currentYield.toFixed(1)}%
              </span>
              <div className="flex items-center space-x-1">
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-lg font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {prediction.predictedYield.toFixed(1)}%
                </span>
              </div>
            </div>

            <Badge 
              variant="outline" 
              className={`mb-2 ${
                prediction.confidence > 0.8 
                  ? 'border-green-400/50 text-green-300' 
                  : prediction.confidence > 0.6 
                  ? 'border-yellow-400/50 text-yellow-300'
                  : 'border-red-400/50 text-red-300'
              }`}
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {Math.round(prediction.confidence * 100)}% certain
            </Badge>

            <div className="text-xs text-purple-200">in {prediction.timeframe}</div>
          </div>
        )}

        {/* Loading State */}
        {isRevealing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-2 text-center">
              <div className="text-lg text-cyan-200 animate-pulse">Consulting the Oracle...</div>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sparkle Effects */}
        <div className="absolute -top-2 -right-2">
          <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
        </div>
        <div className="absolute -bottom-2 -left-2">
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute top-1/4 -left-3">
          <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      {/* Mystical Energy Indicator */}
      <div className="mt-4 text-center">
        <div className="text-sm text-purple-200 mb-2">Mystical Energy</div>
        <div className="relative h-2 bg-gray-700 rounded-full mx-8">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-1000"
            style={{ width: `${mysticalEnergy}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
        <div className="text-xs text-cyan-300 mt-1">{mysticalEnergy}%</div>
      </div>

      {/* Prophecy Reasoning */}
      {!isRevealing && (
        <div className="mt-4 p-3 bg-black/40 rounded-lg border border-purple-500/20 max-w-xs">
          <div className="text-xs text-purple-300 mb-1">The Oracle whispers:</div>
          <div className="text-sm text-white italic">"{prediction.reasoning[0]}"</div>
        </div>
      )}
    </div>
  );
};

export default PredictionOrb;
