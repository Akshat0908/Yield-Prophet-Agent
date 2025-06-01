import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gem, Sparkles, TrendingUp, Twitter } from 'lucide-react';
import SentimentClouds from './SentimentClouds';
import PredictionOrb from './PredictionOrb';
import { mockSentimentData, mockPredictions } from '../../data/mockData';

const CrystalBallInterface = () => {
  const [currentPrediction, setCurrentPrediction] = useState(mockPredictions[0]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [mysticalEnergy, setMysticalEnergy] = useState(85);

  const revealProphecy = () => {
    setIsRevealing(true);
    setTimeout(() => {
      const randomPrediction = mockPredictions[Math.floor(Math.random() * mockPredictions.length)];
      setCurrentPrediction(randomPrediction);
      setMysticalEnergy(Math.floor(Math.random() * 20) + 75);
      setIsRevealing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Mystical Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 space-y-8">
        {/* Mystical Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Gem className="w-8 h-8 text-purple-400 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              The Yield Oracle
            </h1>
            <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto">
            Gaze into the crystal depths where social whispers meet blockchain truths, 
            revealing the future of DeFi yields through mystical algorithms
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              Mystical Energy: {mysticalEnergy}%
            </Badge>
            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <TrendingUp className="w-3 h-3 mr-1" />
              Prophecy Accuracy: 78.4%
            </Badge>
          </div>
        </div>

        {/* Main Crystal Ball Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sentiment Clouds */}
          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-purple-100 flex items-center">
                <Twitter className="w-5 h-5 mr-2" />
                Social Whispers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SentimentClouds sentimentData={mockSentimentData} />
            </CardContent>
          </Card>

          {/* Crystal Ball Prediction */}
          <Card className="bg-gradient-to-br from-cyan-900/50 to-purple-900/50 border-cyan-500/30 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-cyan-100 flex items-center justify-center">
                <Gem className="w-5 h-5 mr-2 animate-pulse" />
                The Crystal Ball
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <PredictionOrb 
                prediction={currentPrediction}
                isRevealing={isRevealing}
                mysticalEnergy={mysticalEnergy}
              />
              <Button
                onClick={revealProphecy}
                disabled={isRevealing}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full"
              >
                {isRevealing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Consulting the Oracle...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Reveal New Prophecy
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Divination History */}
          <Card className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 border-pink-500/30 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-pink-100">Divination History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockPredictions.slice(0, 4).map((prediction, index) => (
                <div key={index} className="p-3 bg-black/30 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-purple-200">{prediction.protocol}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        prediction.confidence > 0.8 
                          ? 'border-green-500/50 text-green-300' 
                          : prediction.confidence > 0.6 
                          ? 'border-yellow-500/50 text-yellow-300'
                          : 'border-red-500/50 text-red-300'
                      }`}
                    >
                      {Math.round(prediction.confidence * 100)}% certain
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-300">
                    {prediction.currentYield.toFixed(2)}% → {prediction.predictedYield.toFixed(2)}%
                  </div>
                  <div className="text-xs text-purple-300 mt-1">
                    "{prediction.reasoning[0]}"
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Mystical Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 border-emerald-500/30 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-emerald-300 mb-2">4</div>
              <div className="text-emerald-100">Protocols Divined</div>
              <div className="text-xs text-emerald-400 mt-1">Across the Aptos realm</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-300 mb-2">∞</div>
              <div className="text-purple-100">Mystical Predictions</div>
              <div className="text-xs text-purple-400 mt-1">Generated by the Oracle</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-900/50 to-red-900/50 border-pink-500/30 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-pink-300 mb-2">23%</div>
              <div className="text-pink-100">Prophetic Advantage</div>
              <div className="text-xs text-pink-400 mt-1">Over mortal farming</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CrystalBallInterface;
