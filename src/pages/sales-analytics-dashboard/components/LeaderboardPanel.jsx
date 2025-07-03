import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const LeaderboardPanel = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [metric, setMetric] = useState('revenue');

  const leaderboardData = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      position: 1,
      revenue: 485000,
      deals: 32,
      conversionRate: 24.5,
      target: 450000,
      achievement: 107.8,
      badge: 'top-performer',
      trend: 'up',
      change: 12.3
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      position: 2,
      revenue: 462000,
      deals: 29,
      conversionRate: 22.1,
      target: 450000,
      achievement: 102.7,
      badge: 'rising-star',
      trend: 'up',
      change: 8.7
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      position: 3,
      revenue: 441000,
      deals: 31,
      conversionRate: 21.8,
      target: 450000,
      achievement: 98.0,
      badge: 'consistent',
      trend: 'up',
      change: 5.2
    },
    {
      id: 4,
      name: 'David Thompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      position: 4,
      revenue: 398000,
      deals: 26,
      conversionRate: 19.4,
      target: 450000,
      achievement: 88.4,
      badge: 'improving',
      trend: 'up',
      change: 3.1
    },
    {
      id: 5,
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      position: 5,
      revenue: 376000,
      deals: 24,
      conversionRate: 18.7,
      target: 450000,
      achievement: 83.6,
      badge: 'potential',
      trend: 'down',
      change: -2.4
    },
    {
      id: 6,
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      position: 6,
      revenue: 352000,
      deals: 22,
      conversionRate: 17.2,
      target: 450000,
      achievement: 78.2,
      badge: 'needs-support',
      trend: 'down',
      change: -5.8
    }
  ];

  const badgeConfig = {
    'top-performer': { color: 'bg-success text-success-foreground', icon: 'Crown' },
    'rising-star': { color: 'bg-primary text-primary-foreground', icon: 'Star' },
    'consistent': { color: 'bg-accent text-accent-foreground', icon: 'Target' },
    'improving': { color: 'bg-warning text-warning-foreground', icon: 'TrendingUp' },
    'potential': { color: 'bg-secondary text-secondary-foreground', icon: 'Zap' },
    'needs-support': { color: 'bg-error text-error-foreground', icon: 'AlertCircle' }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getPositionIcon = (position) => {
    switch (position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return position;
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 card-elevation h-fit">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Top Performers</h3>
          <p className="text-sm text-text-secondary">Sales team leaderboard</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-2 py-1 border border-border rounded text-sm bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          
          <Button variant="ghost" className="p-1">
            <Icon name="MoreVertical" size={16} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {leaderboardData.map((rep) => {
          const badge = badgeConfig[rep.badge];
          const progress = (rep.revenue / rep.target) * 100;
          
          return (
            <div key={rep.id} className="flex items-center space-x-4 p-4 rounded-lg bg-surface-50 hover:bg-surface-100 transition-smooth">
              {/* Position & Avatar */}
              <div className="flex items-center space-x-3">
                <div className="text-lg font-bold text-text-primary w-8 text-center">
                  {getPositionIcon(rep.position)}
                </div>
                <div className="relative">
                  <Image
                    src={rep.avatar}
                    alt={rep.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {rep.position <= 3 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                      <Icon name="Star" size={10} color="white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Rep Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-text-primary truncate">{rep.name}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                    <Icon name={badge.icon} size={12} className="inline mr-1" />
                    {rep.badge.replace('-', ' ')}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span>{formatCurrency(rep.revenue)}</span>
                  <span>•</span>
                  <span>{rep.deals} deals</span>
                  <span>•</span>
                  <span>{rep.conversionRate}% conv.</span>
                </div>

                {/* Progress Bar */}
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-text-muted mb-1">
                    <span>Target Progress</span>
                    <span>{rep.achievement}%</span>
                  </div>
                  <div className="w-full bg-surface-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        progress >= 100 ? 'bg-success' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Trend Indicator */}
              <div className="flex flex-col items-end space-y-1">
                <div className={`flex items-center space-x-1 text-sm ${
                  rep.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  <Icon name={rep.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
                  <span>{Math.abs(rep.change)}%</span>
                </div>
                <Button variant="ghost" className="p-1">
                  <Icon name="ChevronRight" size={14} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Users">
          View All Representatives
        </Button>
      </div>
    </div>
  );
};

export default LeaderboardPanel;