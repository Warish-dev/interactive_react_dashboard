import React, { useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueChart = () => {
  const [viewMode, setViewMode] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const monthlyData = [
    { month: 'Jan', revenue: 850000, conversionRate: 12.5, deals: 68, avgDealSize: 12500 },
    { month: 'Feb', revenue: 920000, conversionRate: 14.2, deals: 74, avgDealSize: 12432 },
    { month: 'Mar', revenue: 1100000, conversionRate: 15.8, deals: 88, avgDealSize: 12500 },
    { month: 'Apr', revenue: 980000, conversionRate: 13.9, deals: 78, avgDealSize: 12564 },
    { month: 'May', revenue: 1250000, conversionRate: 16.4, deals: 95, avgDealSize: 13158 },
    { month: 'Jun', revenue: 1180000, conversionRate: 15.1, deals: 89, avgDealSize: 13258 },
    { month: 'Jul', revenue: 1320000, conversionRate: 17.2, deals: 98, avgDealSize: 13469 },
    { month: 'Aug', revenue: 1280000, conversionRate: 16.8, deals: 94, avgDealSize: 13617 },
    { month: 'Sep', revenue: 1450000, conversionRate: 18.5, deals: 105, avgDealSize: 13810 },
    { month: 'Oct', revenue: 1380000, conversionRate: 17.9, deals: 99, avgDealSize: 13939 },
    { month: 'Nov', revenue: 1520000, conversionRate: 19.2, deals: 108, avgDealSize: 14074 },
    { month: 'Dec', revenue: 1680000, conversionRate: 20.1, deals: 118, avgDealSize: 14237 }
  ];

  const quarterlyData = [
    { period: 'Q1 2024', revenue: 2870000, conversionRate: 14.2, deals: 230, avgDealSize: 12478 },
    { period: 'Q2 2024', revenue: 3410000, conversionRate: 15.1, deals: 262, avgDealSize: 13015 },
    { period: 'Q3 2024', revenue: 4050000, conversionRate: 17.5, deals: 297, avgDealSize: 13632 },
    { period: 'Q4 2024', revenue: 4580000, conversionRate: 19.1, deals: 325, avgDealSize: 14092 }
  ];

  const currentData = viewMode === 'monthly' ? monthlyData : quarterlyData;
  const xAxisKey = viewMode === 'monthly' ? 'month' : 'period';

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value) => `${value}%`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-lg">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-text-secondary">{entry.name}:</span>
              <span className="font-medium text-text-primary">
                {entry.name === 'Conversion Rate' 
                  ? formatPercentage(entry.value)
                  : entry.name === 'Revenue'
                  ? formatCurrency(entry.value)
                  : entry.value.toLocaleString()
                }
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const drillDownOptions = [
    { value: 'territory', label: 'By Territory', icon: 'MapPin' },
    { value: 'product', label: 'By Product Line', icon: 'Package' },
    { value: 'rep', label: 'By Representative', icon: 'User' }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-6 card-elevation">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Revenue Performance</h3>
          <p className="text-sm text-text-secondary">Monthly revenue trends with conversion rate overlay</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex bg-surface-50 rounded-lg p-1">
            <Button
              variant={viewMode === 'monthly' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('monthly')}
              className="text-sm px-3 py-1"
            >
              Monthly
            </Button>
            <Button
              variant={viewMode === 'quarterly' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('quarterly')}
              className="text-sm px-3 py-1"
            >
              Quarterly
            </Button>
          </div>

          {/* Drill Down Options */}
          <select
            className="px-3 py-2 border border-border rounded-md bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            defaultValue=""
          >
            <option value="" disabled>Drill Down</option>
            {drillDownOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Export Button */}
          <Button variant="outline" iconName="Download" className="text-sm">
            Export
          </Button>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey={xAxisKey} 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="left"
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={formatPercentage}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="revenue" 
              fill="var(--color-primary)" 
              name="Revenue"
              radius={[4, 4, 0, 0]}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="conversionRate" 
              stroke="var(--color-accent)" 
              strokeWidth={3}
              name="Conversion Rate"
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Insights */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" />
            <span className="text-text-secondary">Peak Month:</span>
            <span className="font-medium text-text-primary">December ($1.68M)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} color="var(--color-primary)" />
            <span className="text-text-secondary">Avg Conversion:</span>
            <span className="font-medium text-text-primary">16.2%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={16} color="var(--color-accent)" />
            <span className="text-text-secondary">Growth Rate:</span>
            <span className="font-medium text-success">+24.3% YoY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;