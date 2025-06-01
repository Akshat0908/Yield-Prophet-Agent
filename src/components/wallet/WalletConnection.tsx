
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, AlertCircle, CheckCircle } from 'lucide-react';
import { moveAgentService } from '../../services/moveAgentKit';

interface WalletConnectionProps {
  onConnected?: (address: string) => void;
  onDisconnected?: () => void;
}

const WalletConnection: React.FC<WalletConnectionProps> = ({ onConnected, onDisconnected }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Check if wallet was previously connected
    const savedAddress = localStorage.getItem('wallet_address');
    if (savedAddress) {
      setAddress(savedAddress);
      setIsConnected(true);
      updateBalance();
    }
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError('');

    try {
      // For demo purposes, generate a test wallet
      const walletAddress = await moveAgentService.connectWallet();
      
      setAddress(walletAddress);
      setIsConnected(true);
      localStorage.setItem('wallet_address', walletAddress);
      
      await updateBalance();
      onConnected?.(walletAddress);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(errorMessage);
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress('');
    setBalance(0);
    setError('');
    localStorage.removeItem('wallet_address');
    onDisconnected?.();
  };

  const updateBalance = async () => {
    try {
      const currentBalance = await moveAgentService.getAccountBalance();
      setBalance(currentBalance);
    } catch (err) {
      console.error('Failed to update balance:', err);
    }
  };

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Wallet className="w-5 h-5 mr-2" />
            Connect Aptos Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-purple-200 text-sm">
            Connect your wallet to start using the Yield Prophet Agent with real Aptos DeFi protocols.
          </p>
          
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-900/30 border border-red-500/30 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          <Button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4 mr-2" />
                Connect Demo Wallet
              </>
            )}
          </Button>

          <p className="text-xs text-purple-400 text-center">
            Demo wallet will be created automatically for testing purposes
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            Wallet Connected
          </div>
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            Testnet
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-green-200 text-sm">Address:</span>
            <code className="text-white text-sm font-mono">{formatAddress(address)}</code>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-green-200 text-sm">Balance:</span>
            <span className="text-white text-sm font-semibold">{balance.toFixed(4)} APT</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={updateBalance}
            variant="outline"
            size="sm"
            className="border-green-500/30 text-green-300 hover:bg-green-500/10"
          >
            Refresh
          </Button>
          
          <Button
            onClick={disconnectWallet}
            variant="outline"
            size="sm"
            className="border-red-500/30 text-red-300 hover:bg-red-500/10"
          >
            Disconnect
          </Button>
        </div>

        <p className="text-xs text-green-400">
          Ready for automated yield farming and rebalancing
        </p>
      </CardContent>
    </Card>
  );
};

export default WalletConnection;
