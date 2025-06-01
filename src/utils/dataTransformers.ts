
import { YieldData } from '../services/moveAgentKit';
import { ProtocolData } from '../data/mockData';

export const transformYieldDataToProtocolData = (yieldData: YieldData[]): ProtocolData[] => {
  const protocolLogos: Record<string, string> = {
    'Thala Finance': '🌊',
    'LiquidSwap': '💧',
    'Joule': '⚡',
    'Echelon': '🎯'
  };

  const protocolCategories: Record<string, string> = {
    'Thala Finance': 'Lending',
    'LiquidSwap': 'DEX',
    'Joule': 'Yield Farming',
    'Echelon': 'Derivatives'
  };

  return yieldData.map(data => ({
    name: data.protocol,
    currentYield: data.apy,
    tvl: data.tvl,
    change24h: (Math.random() * 6 - 3), // Random 24h change for demo
    logo: protocolLogos[data.protocol] || '🔮',
    riskLevel: data.risk,
    category: protocolCategories[data.protocol] || 'DeFi'
  }));
};
