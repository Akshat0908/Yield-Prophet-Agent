
export interface ProtocolData {
  name: string;
  currentYield: number;
  tvl: number;
  change24h: number;
  logo: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  category: string;
}

export interface YieldPrediction {
  protocol: string;
  currentYield: number;
  predictedYield: number;
  confidence: number;
  timeframe: string;
  reasoning: string[];
  sentiment: number;
}

export interface SentimentData {
  protocol: string;
  sentiment: number;
  confidence: number;
  tweetCount: number;
  keywords: string[];
  timestamp: Date;
}

export interface PortfolioAllocation {
  protocol: string;
  allocation: number;
  value: number;
  color: string;
}

export const mockProtocolData: ProtocolData[] = [
  {
    name: 'Thala Finance',
    currentYield: 12.45,
    tvl: 45_000_000,
    change24h: 2.3,
    logo: '🌊',
    riskLevel: 'Medium',
    category: 'Lending'
  },
  {
    name: 'LiquidSwap',
    currentYield: 8.92,
    tvl: 32_000_000,
    change24h: -0.8,
    logo: '💧',
    riskLevel: 'Low',
    category: 'DEX'
  },
  {
    name: 'Joule Finance',
    currentYield: 15.67,
    tvl: 18_000_000,
    change24h: 4.2,
    logo: '⚡',
    riskLevel: 'High',
    category: 'Yield Farming'
  },
  {
    name: 'Echelon Finance',
    currentYield: 11.23,
    tvl: 25_000_000,
    change24h: 1.5,
    logo: '🎯',
    riskLevel: 'Medium',
    category: 'Derivatives'
  }
];

export const mockPredictions: YieldPrediction[] = [
  {
    protocol: 'Thala Finance',
    currentYield: 12.45,
    predictedYield: 14.2,
    confidence: 0.82,
    timeframe: '6h',
    reasoning: [
      'Strong positive sentiment detected on social media',
      'TVL increasing by 15% in last 24h',
      'Major protocol upgrade announcement'
    ],
    sentiment: 0.7
  },
  {
    protocol: 'LiquidSwap',
    currentYield: 8.92,
    predictedYield: 8.1,
    confidence: 0.65,
    timeframe: '12h',
    reasoning: [
      'Mild negative sentiment due to market uncertainty',
      'Decreased trading volume',
      'Competitive pressure from new protocols'
    ],
    sentiment: -0.2
  },
  {
    protocol: 'Joule Finance',
    currentYield: 15.67,
    predictedYield: 17.5,
    confidence: 0.89,
    timeframe: '3h',
    reasoning: [
      'Extremely bullish sentiment following partnership news',
      'Whale deposits detected',
      'New yield farming incentives launched'
    ],
    sentiment: 0.9
  },
  {
    protocol: 'Echelon Finance',
    currentYield: 11.23,
    predictedYield: 10.8,
    confidence: 0.73,
    timeframe: '8h',
    reasoning: [
      'Mixed sentiment in community discussions',
      'Slight outflow of funds',
      'Awaiting governance proposal results'
    ],
    sentiment: 0.1
  }
];

export const mockSentimentData: SentimentData[] = [
  {
    protocol: 'Thala Finance',
    sentiment: 0.7,
    confidence: 0.85,
    tweetCount: 156,
    keywords: ['bullish', 'moon', 'aping', 'yields', 'WAGMI'],
    timestamp: new Date()
  },
  {
    protocol: 'LiquidSwap',
    sentiment: -0.2,
    confidence: 0.62,
    tweetCount: 89,
    keywords: ['bearish', 'concerns', 'careful', 'dip', 'wait'],
    timestamp: new Date()
  },
  {
    protocol: 'Joule Finance',
    sentiment: 0.9,
    confidence: 0.91,
    tweetCount: 234,
    keywords: ['partnership', 'explosive', 'gem', 'alpha', 'huge'],
    timestamp: new Date()
  },
  {
    protocol: 'Echelon Finance',
    sentiment: 0.1,
    confidence: 0.58,
    tweetCount: 67,
    keywords: ['unsure', 'waiting', 'maybe', 'governance', 'hodl'],
    timestamp: new Date()
  }
];

export const mockPortfolioData: PortfolioAllocation[] = [
  {
    protocol: 'Thala Finance',
    allocation: 35,
    value: 43_908,
    color: '#3B82F6'
  },
  {
    protocol: 'Joule Finance',
    allocation: 28,
    value: 35_126,
    color: '#F59E0B'
  },
  {
    protocol: 'Echelon Finance',
    allocation: 22,
    value: 27_599,
    color: '#10B981'
  },
  {
    protocol: 'LiquidSwap',
    allocation: 15,
    value: 18_817,
    color: '#8B5CF6'
  }
];

export const mockPerformanceData = {
  dates: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 29', 'Feb 5', 'Feb 12'],
  agentReturns: [100, 103.2, 107.8, 112.1, 115.9, 121.3, 125.4],
  manualReturns: [100, 101.8, 104.2, 106.9, 108.7, 111.2, 113.8],
  marketAverage: [100, 101.2, 102.8, 104.1, 105.5, 107.2, 108.9]
};
