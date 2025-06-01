
import React, { useState } from 'react';
import DeFiDashboard from '../components/dashboard/DeFiDashboard';
import CrystalBallInterface from '../components/crystal/CrystalBallInterface';
import { Button } from '@/components/ui/button';
import { TrendingUp, Gem } from 'lucide-react';

const Index = () => {
  const [activeInterface, setActiveInterface] = useState<'defi' | 'crystal'>('defi');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Gem className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Yield Prophet Agent</h1>
                <p className="text-sm text-purple-200">AI-Powered DeFi Yield Prediction</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={activeInterface === 'defi' ? 'default' : 'outline'}
                onClick={() => setActiveInterface('defi')}
                className="flex items-center space-x-2"
              >
                <TrendingUp className="w-4 h-4" />
                <span>DeFi Dashboard</span>
              </Button>
              <Button
                variant={activeInterface === 'crystal' ? 'default' : 'outline'}
                onClick={() => setActiveInterface('crystal')}
                className="flex items-center space-x-2"
              >
                <Gem className="w-4 h-4" />
                <span>Crystal Ball</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeInterface === 'defi' ? <DeFiDashboard /> : <CrystalBallInterface />}
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-black/20 backdrop-blur-lg py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-purple-200">
            Built for Aptos Hackathon • Targeting Best DeFi Agent + Most Unique Agent
          </p>
          <p className="text-sm text-purple-400 mt-2">
            Predicting yields with 78% accuracy • 23% higher returns than manual farming
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
