import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceScorecard = () => {
  const departments = [
    {
      id: 1,
      name: "Sales",
      score: 92,
      status: "excellent",
      trend: "up",
      metrics: {
        revenue: "$4.2M",
        target: "$4.5M",
        achievement: "93%"
      },
      sparklineData: [85, 88, 90, 87, 92, 89, 92],
      issues: 0
    },
    {
      id: 2,
      name: "Marketing",
      score: 78,
      status: "good",
      trend: "up",
      metrics: {
        leads: "2,340",
        target: "2,500",
        achievement: "94%"
      },
      sparklineData: [72, 75, 73, 78, 76, 79, 78],
      issues: 1
    },
    {
      id: 3,
      name: "Operations",
      score: 65,
      status: "warning",
      trend: "down",
      metrics: {
        efficiency: "87%",
        target: "95%",
        achievement: "92%"
      },
      sparklineData: [75, 72, 68, 70, 65, 67, 65],
      issues: 3
    },
    {
      id: 4,
      name: "Customer Success",
      score: 58,
      status: "critical",
      trend: "down",
      metrics: {
        satisfaction: "3.8/5",
        target: "4.5/5",
        achievement: "84%"
      },
      sparklineData: [68, 65, 62, 58, 60, 57, 58],
      issues: 5
    },
    {
      id: 5,
      name: "Finance",
      score: 88,
      status: "excellent",
      trend: "stable",
      metrics: {
        margin: "24%",
        target: "22%",
        achievement: "109%"
      },
      sparklineData: [85, 87, 88, 86, 89, 88, 88],
      issues: 0
    },
    {
      id: 6,
      name: "Human Resources",
      score: 82,
      status: "good",
      trend: "up",
      metrics: {
        retention: "94%",
        target: "90%",
        achievement: "104%"
      },
      sparklineData: [78, 79, 80, 81, 83, 82, 82],
      issues: 1
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-success text-success-foreground';
      case 'good': return 'bg-primary text-primary-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'critical': return 'bg-error text-error-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return 'CheckCircle';
      case 'good': return 'ThumbsUp';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'AlertCircle';
      default: return 'Minus';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      case 'stable': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const Sparkline = ({ data, color = 'var(--color-primary)' }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 15;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="60" height="20" className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="bg-surface rounded-lg p-6 border border-border card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Department Performance Scorecard</h3>
          <p className="text-sm text-text-secondary mt-1">Real-time health indicators across all departments</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="text-xs text-text-secondary">Excellent</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-xs text-text-secondary">Good</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-warning rounded-full" />
            <span className="text-xs text-text-secondary">Warning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-error rounded-full" />
            <span className="text-xs text-text-secondary">Critical</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="p-4 rounded-lg border border-border hover:shadow-md transition-smooth bg-surface-50"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(dept.status)}`}>
                  <Icon name={getStatusIcon(dept.status)} size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-primary">{dept.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-lg font-bold text-text-primary">{dept.score}</span>
                    <div className={`flex items-center space-x-1 ${getTrendColor(dept.trend)}`}>
                      <Icon name={getTrendIcon(dept.trend)} size={12} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Sparkline 
                  data={dept.sparklineData} 
                  color={dept.trend === 'up' ? 'var(--color-success)' : dept.trend === 'down' ? 'var(--color-error)' : 'var(--color-text-secondary)'}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">Current:</span>
                <span className="font-medium text-text-primary">{dept.metrics.revenue || dept.metrics.leads || dept.metrics.efficiency || dept.metrics.satisfaction || dept.metrics.margin || dept.metrics.retention}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">Target:</span>
                <span className="font-medium text-text-primary">{dept.metrics.target}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">Achievement:</span>
                <span className={`font-medium ${
                  parseInt(dept.metrics.achievement) >= 100 ? 'text-success' : 
                  parseInt(dept.metrics.achievement) >= 90 ? 'text-primary' :
                  parseInt(dept.metrics.achievement) >= 80 ? 'text-warning' : 'text-error'
                }`}>
                  {dept.metrics.achievement}
                </span>
              </div>
            </div>

            {dept.issues > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={12} color="var(--color-warning)" />
                  <span className="text-xs text-warning font-medium">
                    {dept.issues} issue{dept.issues > 1 ? 's' : ''} requiring attention
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceScorecard;