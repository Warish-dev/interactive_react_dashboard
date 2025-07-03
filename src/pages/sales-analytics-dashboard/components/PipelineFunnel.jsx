import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PipelineFunnel = () => {
  const [selectedStage, setSelectedStage] = useState(null);
  const [viewMode, setViewMode] = useState('conversion');

  const pipelineData = [
    {
      stage: 'Leads',
      count: 2450,
      value: 12250000,
      conversionRate: 100,
      avgDealSize: 5000,
      avgTimeInStage: 3,
      color: 'bg-slate-500',
      icon: 'Users'
    },
    {
      stage: 'Qualified',
      count: 1470,
      value: 8820000,
      conversionRate: 60.0,
      avgDealSize: 6000,
      avgTimeInStage: 7,
      color: 'bg-blue-500',
      icon: 'UserCheck'
    },
    {
      stage: 'Proposal',
      count: 735,
      value: 5145000,
      conversionRate: 50.0,
      avgDealSize: 7000,
      avgTimeInStage: 14,
      color: 'bg-indigo-500',
      icon: 'FileText'
    },
    {
      stage: 'Negotiation',
      count: 441,
      value: 3969000,
      conversionRate: 60.0,
      avgDealSize: 9000,
      avgTimeInStage: 21,
      color: 'bg-purple-500',
      icon: 'Handshake'
    },
    {
      stage: 'Closed Won',
      count: 294,
      value: 3234000,
      conversionRate: 66.7,
      avgDealSize: 11000,
      avgTimeInStage: 0,
      color: 'bg-green-500',
      icon: 'CheckCircle'
    }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const getStageWidth = (index) => {
    const baseWidth = 100;
    const reduction = index * 15;
    return Math.max(baseWidth - reduction, 30);
  };

  const handleStageClick = (stage, index) => {
    setSelectedStage(selectedStage === index ? null : index);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 card-elevation">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Sales Pipeline Funnel</h3>
          <p className="text-sm text-text-secondary">Stage-by-stage conversion analysis</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-surface-50 rounded-lg p-1">
            <Button
              variant={viewMode === 'conversion' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('conversion')}
              className="text-sm px-3 py-1"
            >
              Conversion
            </Button>
            <Button
              variant={viewMode === 'velocity' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('velocity')}
              className="text-sm px-3 py-1"
            >
              Velocity
            </Button>
          </div>
          
          <Button variant="outline" iconName="Download" className="text-sm">
            Export
          </Button>
        </div>
      </div>

      {/* Funnel Visualization */}
      <div className="relative mb-8">
        <div className="flex flex-col items-center space-y-2">
          {pipelineData.map((stage, index) => {
            const width = getStageWidth(index);
            const isSelected = selectedStage === index;
            
            return (
              <div key={stage.stage} className="w-full flex flex-col items-center">
                {/* Stage Block */}
                <div
                  className={`relative cursor-pointer transition-all duration-300 ${
                    isSelected ? 'transform scale-105' : ''
                  }`}
                  style={{ width: `${width}%` }}
                  onClick={() => handleStageClick(stage, index)}
                >
                  <div className={`${stage.color} rounded-lg p-4 text-white shadow-md hover:shadow-lg transition-shadow`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon name={stage.icon} size={20} color="white" />
                        <span className="font-semibold">{stage.stage}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatNumber(stage.count)}</div>
                        <div className="text-sm opacity-90">{formatCurrency(stage.value)}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm opacity-90">
                      <span>Conv: {stage.conversionRate}%</span>
                      <span>Avg: {formatCurrency(stage.avgDealSize)}</span>
                      {viewMode === 'velocity' && (
                        <span>{stage.avgTimeInStage} days</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Conversion Arrow */}
                  {index < pipelineData.length - 1 && (
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-border"></div>
                    </div>
                  )}
                </div>

                {/* Detailed View */}
                {isSelected && (
                  <div className="w-full max-w-2xl mt-4 p-4 bg-surface-50 rounded-lg border border-border">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-text-secondary">Opportunities:</span>
                        <div className="font-semibold text-text-primary">{formatNumber(stage.count)}</div>
                      </div>
                      <div>
                        <span className="text-text-secondary">Total Value:</span>
                        <div className="font-semibold text-text-primary">{formatCurrency(stage.value)}</div>
                      </div>
                      <div>
                        <span className="text-text-secondary">Avg Deal Size:</span>
                        <div className="font-semibold text-text-primary">{formatCurrency(stage.avgDealSize)}</div>
                      </div>
                      <div>
                        <span className="text-text-secondary">Avg Time:</span>
                        <div className="font-semibold text-text-primary">{stage.avgTimeInStage} days</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <Button variant="primary" className="text-sm">
                        View Opportunities
                      </Button>
                      <Button variant="outline" className="text-sm">
                        Stage Analysis
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pipeline Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary">12.0%</div>
          <div className="text-sm text-text-secondary">Overall Conversion</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary">45</div>
          <div className="text-sm text-text-secondary">Avg Sales Cycle (days)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary">{formatCurrency(8500)}</div>
          <div className="text-sm text-text-secondary">Avg Deal Size</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">+15.3%</div>
          <div className="text-sm text-text-secondary">Pipeline Growth</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border">
        <Button variant="primary" iconName="Target">
          Forecast Analysis
        </Button>
        <Button variant="outline" iconName="Users">
          Cohort Analysis
        </Button>
        <Button variant="outline" iconName="BarChart3">
          Custom Scenarios
        </Button>
      </div>
    </div>
  );
};

export default PipelineFunnel;