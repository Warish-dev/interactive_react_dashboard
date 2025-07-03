import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutiveAlerts = () => {
  const alerts = [
    {
      id: 1,
      title: "Customer Churn Rate Spike",
      description: "Monthly churn increased by 15% in Q4, requiring immediate retention strategy review",
      priority: "high",
      impact: "Revenue Impact: -$2.3M",
      timestamp: "2 hours ago",
      department: "Customer Success",
      actionRequired: true
    },
    {
      id: 2,
      title: "Supply Chain Disruption",
      description: "Key supplier delays affecting 23% of product inventory, potential delivery delays",
      priority: "critical",
      impact: "Operational Impact: High",
      timestamp: "4 hours ago",
      department: "Operations",
      actionRequired: true
    },
    {
      id: 3,
      title: "Q4 Revenue Target Achievement",
      description: "Currently at 94% of quarterly target with 2 weeks remaining in quarter",
      priority: "medium",
      impact: "Revenue Gap: $1.2M",
      timestamp: "6 hours ago",
      department: "Sales",
      actionRequired: false
    },
    {
      id: 4,
      title: "Cybersecurity Incident",
      description: "Potential data breach attempt detected and contained, security audit recommended",
      priority: "high",
      impact: "Security Risk: Medium",
      timestamp: "8 hours ago",
      department: "IT Security",
      actionRequired: true
    },
    {
      id: 5,
      title: "New Market Opportunity",
      description: "Competitor exit creates $5M market opportunity in Southeast region",
      priority: "low",
      impact: "Growth Potential: $5M",
      timestamp: "1 day ago",
      department: "Strategy",
      actionRequired: false
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error bg-error-50 border-error/20';
      case 'high': return 'text-warning bg-warning-50 border-warning/20';
      case 'medium': return 'text-accent bg-accent-50 border-accent/20';
      case 'low': return 'text-success bg-success-50 border-success/20';
      default: return 'text-text-secondary bg-surface-50 border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'Bell';
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 border border-border card-elevation h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Executive Alerts</h3>
          <p className="text-sm text-text-secondary mt-1">Critical issues requiring attention</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
          <span className="text-xs text-text-secondary">Live</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border transition-smooth hover:shadow-md ${
              alert.actionRequired ? 'bg-surface-50' : 'bg-surface'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg border ${getPriorityColor(alert.priority)}`}>
                <Icon name={getPriorityIcon(alert.priority)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-text-primary line-clamp-1">
                    {alert.title}
                  </h4>
                  {alert.actionRequired && (
                    <div className="flex items-center space-x-1 text-error">
                      <Icon name="Clock" size={12} />
                      <span className="text-xs font-medium">Action Required</span>
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-text-secondary mb-3 line-clamp-2">
                  {alert.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-medium text-text-primary">
                      {alert.impact}
                    </span>
                    <span className="text-xs text-text-muted">
                      {alert.department}
                    </span>
                  </div>
                  <span className="text-xs text-text-muted">
                    {alert.timestamp}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary-700 font-medium transition-smooth">
          View All Alerts ({alerts.length})
        </button>
      </div>
    </div>
  );
};

export default ExecutiveAlerts;