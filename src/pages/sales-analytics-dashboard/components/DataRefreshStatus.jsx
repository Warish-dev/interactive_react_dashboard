import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataRefreshStatus = ({ onRefresh }) => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [nextRefresh, setNextRefresh] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setNextRefresh(prev => {
        if (prev <= 1) {
          setLastUpdated(new Date());
          return 15;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      setLastUpdated(new Date());
      setNextRefresh(15);
      if (onRefresh) onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusColor = () => {
    if (isRefreshing) return 'text-warning';
    if (nextRefresh <= 5) return 'text-error';
    return 'text-success';
  };

  const getStatusIcon = () => {
    if (isRefreshing) return 'RefreshCw';
    if (nextRefresh <= 5) return 'AlertCircle';
    return 'CheckCircle';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getStatusIcon()} 
              size={16} 
              color={`var(--color-${getStatusColor().replace('text-', '')})`}
              className={isRefreshing ? 'animate-spin' : ''}
            />
            <span className="text-sm font-medium text-text-primary">
              Data Status
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>Last updated: {formatTime(lastUpdated)}</span>
            </div>
            
            {!isRefreshing && (
              <div className="flex items-center space-x-1">
                <Icon name="Timer" size={14} />
                <span>Next refresh: {nextRefresh}m</span>
              </div>
            )}
            
            {isRefreshing && (
              <div className="flex items-center space-x-1">
                <span className="text-warning">Refreshing data...</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="text-sm"
            iconName="RefreshCw"
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh Now'}
          </Button>
          
          <div className="flex items-center space-x-1 text-xs text-text-muted">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </div>

      {/* Data Sources Status */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-text-secondary">CRM System</span>
            <span className="text-success font-medium">Connected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-text-secondary">Sales Platform</span>
            <span className="text-success font-medium">Synced</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <span className="text-text-secondary">Email Analytics</span>
            <span className="text-warning font-medium">Delayed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-text-secondary">Revenue Data</span>
            <span className="text-success font-medium">Real-time</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataRefreshStatus;