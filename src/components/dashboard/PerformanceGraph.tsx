
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockPerformanceData } from '../../data/mockData';

const PerformanceGraph = () => {
  const data = mockPerformanceData.dates.map((date, index) => ({
    date,
    'Yield Prophet Agent': mockPerformanceData.agentReturns[index],
    'Manual Farming': mockPerformanceData.manualReturns[index],
    'Market Average': mockPerformanceData.marketAverage[index]
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 p-3 rounded-lg border border-purple-500/20 backdrop-blur-lg">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey}: ${entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
            domain={['dataMin - 2', 'dataMax + 2']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ color: '#9CA3AF' }}
          />
          <Line
            type="monotone"
            dataKey="Yield Prophet Agent"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="Manual Farming"
            stroke="#F59E0B"
            strokeWidth={2}
            dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="Market Average"
            stroke="#6B7280"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#6B7280', strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20">
          <p className="text-green-400 font-semibold">Agent ROI</p>
          <p className="text-2xl font-bold text-white">+25.4%</p>
        </div>
        <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/20">
          <p className="text-yellow-400 font-semibold">Manual ROI</p>
          <p className="text-2xl font-bold text-white">+13.8%</p>
        </div>
        <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
          <p className="text-purple-400 font-semibold">Advantage</p>
          <p className="text-2xl font-bold text-white">+11.6%</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceGraph;
