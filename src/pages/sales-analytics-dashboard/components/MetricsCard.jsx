import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, target, icon, color = 'primary' }) => {
  const isPositive = change >= 0;
  const progress = target ? (value / target) * 100 : 0;
  
  const colorClasses = {
    primary: 'bg-primary-50 text-primary border-primary/20',
    success: 'bg-success-50 text-success border-success/20',
    warning: 'bg-warning-50 text-warning border-warning/20',
    accent: 'bg-accent-50 text-accent border-accent/20'
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon name={icon} size={24} />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${
          isPositive ? 'text-success' : 'text-error'
        }`}>
          <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} size={16} />
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        <div className="text-2xl font-semibold text-text-primary">{value}</div>
        
        {target && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-text-muted">
              <span>Target: {target}</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-surface-100 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  progress >= 100 ? 'bg-success' : `bg-${color}`
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;