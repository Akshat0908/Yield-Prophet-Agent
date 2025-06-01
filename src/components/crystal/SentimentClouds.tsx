
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { SentimentData } from '../../data/mockData';

interface SentimentCloudsProps {
  sentimentData: SentimentData[];
}

const SentimentClouds: React.FC<SentimentCloudsProps> = ({ sentimentData }) => {
  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.5) return 'text-green-300 border-green-500/50';
    if (sentiment > 0) return 'text-yellow-300 border-yellow-500/50';
    if (sentiment > -0.5) return 'text-orange-300 border-orange-500/50';
    return 'text-red-300 border-red-500/50';
  };

  const getSentimentEmoji = (sentiment: number) => {
    if (sentiment > 0.5) return '🚀';
    if (sentiment > 0) return '😊';
    if (sentiment > -0.5) return '😐';
    return '📉';
  };

  return (
    <div className="space-y-4">
      {sentimentData.map((data, index) => (
        <div key={index} className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-purple-200 font-medium">{data.protocol}</span>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{getSentimentEmoji(data.sentiment)}</span>
              <Badge variant="outline" className={getSentimentColor(data.sentiment)}>
                {data.sentiment > 0 ? '+' : ''}{(data.sentiment * 100).toFixed(0)}%
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {data.keywords.map((keyword, keyIndex) => (
              <span
                key={keyIndex}
                className={`px-2 py-1 text-xs rounded-full border ${getSentimentColor(data.sentiment)} bg-black/30 backdrop-blur-sm animate-pulse`}
                style={{
                  animationDelay: `${keyIndex * 0.2}s`,
                  animationDuration: '2s'
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
          
          <div className="text-xs text-purple-400">
            {data.tweetCount} whispers • {Math.round(data.confidence * 100)}% clarity
          </div>
          
          {/* Mystical sentiment visualization */}
          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full transition-all duration-1000 ${
                data.sentiment > 0 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-400' 
                  : 'bg-gradient-to-r from-red-500 to-orange-400'
              }`}
              style={{
                width: `${Math.abs(data.sentiment) * 100}%`,
                transform: data.sentiment < 0 ? 'scaleX(-1)' : 'none',
                transformOrigin: 'right'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SentimentClouds;
