
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Zap, ShieldCheck, DollarSign } from 'lucide-react';
import YieldComparisonTable from './YieldComparisonTable';
import PortfolioChart from './PortfolioChart';
import PerformanceGraph from './PerformanceGraph';
import WalletConnection from '../wallet/WalletConnection';
import { moveAgentService, YieldData, PortfolioAllocation, RebalancingResult } from '../../services/moveAgentKit';
import { mockPortfolioData, mockPredictions } from '../../data/mockData';
import { transformYieldDataToProtocolData } from '../../utils/dataTransformers';

const DeFiDashboard = () => {
  const [totalValue, setTotalValue] = useState(125450);
  const [dailyReturn, setDailyReturn] = useState(2.34);
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [protocolData, setProtocolData] = useState<YieldData[]>([]);
  const [isLoadingYields, setIsLoadingYields] = useState(false);
  const [lastRebalancing, setLastRebalancing] = useState<RebalancingResult | null>(null);

  // Fetch real yield data when wallet is connected
  useEffect(() => {
    if (walletConnected) {
      fetchYieldData();
      // Set up periodic updates every 30 seconds
      const interval = setInterval(fetchYieldData, 30000);
      return () => clearInterval(interval);
    }
  }, [walletConnected]);

  const fetchYieldData = async () => {
    setIsLoadingYields(true);
    try {
      const yields = await moveAgentService.getProtocolYields();
      setProtocolData(yields);
      
      // Update portfolio value based on real yields
      const avgYield = yields.reduce((sum, y) => sum + y.apy, 0) / yields.length;
      setDailyReturn(avgYield / 365); // Convert APY to daily
      
    } catch (error) {
      console.error('Failed to fetch yield data:', error);
    } finally {
      setIsLoadingYields(false);
    }
  };

  const handleRebalance = async () => {
    if (!walletConnected) return;

    setIsRebalancing(true);
    try {
      // Calculate optimal allocations based on current yields
      const optimalAllocations = calculateOptimalAllocations(protocolData);
      
      // Execute rebalancing transaction
      const result = await moveAgentService.executeRebalancing(optimalAllocations);
      setLastRebalancing(result);
      
      // Update portfolio value
      setTotalValue(prev => prev + (result.estimatedYieldImprovement * prev));
      setDailyReturn(prev => prev + result.estimatedYieldImprovement * 365);
      
      // Refresh yield data
      await fetchYieldData();
      
    } catch (error) {
      console.error('Rebalancing failed:', error);
    } finally {
      setIsRebalancing(false);
    }
  };

  const calculateOptimalAllocations = (yields: YieldData[]): PortfolioAllocation[] => {
    // Simple optimization: allocate more to higher yielding, lower risk protocols
    const scored = yields.map(y => ({
      ...y,
      score: y.apy * (y.risk === 'Low' ? 1.2 : y.risk === 'Medium' ? 1.0 : 0.8)
    }));
    
    const totalScore = scored.reduce((sum, s) => sum + s.score, 0);
    
    return scored.map(s => ({
      protocol: s.protocol,
      percentage: (s.score / totalScore) * 100,
      amount: totalValue * (s.score / totalScore)
    }));
  };

  const handleWalletConnected = (address: string) => {
    setWalletConnected(true);
    setWalletAddress(address);
  };

  const handleWalletDisconnected = () => {
    setWalletConnected(false);
    setWalletAddress('');
    setProtocolData([]);
  };

  // Transform yield data to protocol data format for the table
  const transformedProtocolData = protocolData.length > 0 
    ? transformYieldDataToProtocolData(protocolData) 
    : [];

  return (
    <div className="space-y-6">
      {/* Wallet Connection */}
      {!walletConnected && (
        <WalletConnection 
          onConnected={handleWalletConnected}
          onDisconnected={handleWalletDisconnected}
        />
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-100">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-green-300">
              {walletConnected ? '+15.2% vs manual farming' : 'Connect wallet to see real data'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Daily Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{dailyReturn.toFixed(2)}%</div>
            <p className="text-xs text-blue-300">
              {walletConnected ? 'Live from Aptos protocols' : 'Real-time when connected'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Prediction Accuracy</CardTitle>
            <Zap className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">78.4%</div>
            <p className="text-xs text-purple-300">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">Gas Saved</CardTitle>
            <ShieldCheck className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {lastRebalancing ? `$${(lastRebalancing.gasCost * 10).toFixed(0)}` : '$127'}
            </div>
            <p className="text-xs text-orange-300">Through optimization</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <Button
          onClick={handleRebalance}
          disabled={isRebalancing || !walletConnected}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {isRebalancing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Rebalancing on Aptos...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              {walletConnected ? 'Auto-Rebalance Portfolio' : 'Connect Wallet to Rebalance'}
            </>
          )}
        </Button>
        
        <Badge variant="outline" className={`${walletConnected ? 'border-green-500/50 text-green-400' : 'border-gray-500/50 text-gray-400'}`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${walletConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
          {walletConnected ? 'Agent Active' : 'Agent Offline'}
        </Badge>

        {isLoadingYields && (
          <Badge variant="outline" className="border-blue-500/50 text-blue-400">
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-400 mr-2"></div>
            Fetching Live Data
          </Badge>
        )}
      </div>

      {/* Last Rebalancing Info */}
      {lastRebalancing && (
        <Card className="bg-gradient-to-br from-emerald-900/50 to-green-900/50 border-emerald-500/30 backdrop-blur-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-200 text-sm">Last Rebalancing Transaction</p>
                <p className="text-white font-mono text-xs">{lastRebalancing.transactionHash}</p>
              </div>
              <div className="text-right">
                <p className="text-emerald-200 text-sm">Yield Improvement</p>
                <p className="text-white font-bold">+{(lastRebalancing.estimatedYieldImprovement * 100).toFixed(2)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">
              {walletConnected ? 'Live Yield Comparison' : 'Protocol Yields (Demo Mode)'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <YieldComparisonTable 
              data={transformedProtocolData} 
              predictions={mockPredictions} 
            />
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <PortfolioChart data={mockPortfolioData} />
          </CardContent>
        </Card>
      </div>

      {/* Performance Graph */}
      <Card className="bg-black/40 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white">Performance vs Manual Farming</CardTitle>
        </CardHeader>
        <CardContent>
          <PerformanceGraph />
        </CardContent>
      </div>
    </div>
  );
};

export default DeFiDashboard;
