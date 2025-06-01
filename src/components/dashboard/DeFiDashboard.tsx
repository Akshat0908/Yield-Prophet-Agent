
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Zap, ShieldCheck, DollarSign } from 'lucide-react';
import YieldComparisonTable from './YieldComparisonTable';
import PortfolioChart from './PortfolioChart';
import PerformanceGraph from './PerformanceGraph';
import { mockProtocolData, mockPortfolioData, mockPredictions } from '../../data/mockData';

const DeFiDashboard = () => {
  const [totalValue, setTotalValue] = useState(125450);
  const [dailyReturn, setDailyReturn] = useState(2.34);
  const [isRebalancing, setIsRebalancing] = useState(false);

  const handleRebalance = async () => {
    setIsRebalancing(true);
    // Simulate rebalancing process
    setTimeout(() => {
      setIsRebalancing(false);
      setTotalValue(prev => prev + Math.random() * 1000 + 500);
      setDailyReturn(prev => prev + Math.random() * 0.5 + 0.1);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-100">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-green-300">+15.2% vs manual farming</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Daily Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{dailyReturn.toFixed(2)}%</div>
            <p className="text-xs text-blue-300">Above market average</p>
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
            <div className="text-2xl font-bold text-white">$127</div>
            <p className="text-xs text-orange-300">Through optimization</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <Button
          onClick={handleRebalance}
          disabled={isRebalancing}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {isRebalancing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Rebalancing...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Auto-Rebalance Portfolio
            </>
          )}
        </Button>
        
        <Badge variant="outline" className="border-green-500/50 text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          Agent Active
        </Badge>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Live Yield Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <YieldComparisonTable data={mockProtocolData} predictions={mockPredictions} />
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
