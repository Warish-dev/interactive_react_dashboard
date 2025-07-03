import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const RevenueChart = () => {
  const revenueData = [
    { month: "Jan", actual: 2400000, forecast: 2300000, variance: 100000 },
    { month: "Feb", actual: 2100000, forecast: 2200000, variance: -100000 },
    { month: "Mar", actual: 2800000, forecast: 2600000, variance: 200000 },
    { month: "Apr", actual: 3200000, forecast: 3000000, variance: 200000 },
    { month: "May", actual: 2900000, forecast: 3100000, variance: -200000 },
    { month: "Jun", actual: 3400000, forecast: 3300000, variance: 100000 },
    { month: "Jul", actual: 3600000, forecast: 3500000, variance: 100000 },
    { month: "Aug", actual: 3300000, forecast: 3400000, variance: -100000 },
    { month: "Sep", actual: 3800000, forecast: 3700000, variance: 100000 },
    { month: "Oct", actual: 4100000, forecast: 4000000, variance: 100000 },
    { month: "Nov", actual: 4300000, forecast: 4200000, variance: 100000 },
    { month: "Dec", actual: 4500000, forecast: 4400000, variance: 100000 }
  ];

  const formatCurrency = (value) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-text-primary mb-2">{`${label} 2024`}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-text-secondary capitalize">{entry.dataKey}:</span>
              <span className="text-sm font-medium text-text-primary">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg p-6 border border-border card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Revenue Trend & Forecast</h3>
          <p className="text-sm text-text-secondary mt-1">Monthly performance with variance analysis</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-xs text-text-secondary">Actual</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <span className="text-xs text-text-secondary">Forecast</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#actualGradient)"
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="var(--color-accent)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;