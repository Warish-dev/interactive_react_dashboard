import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertStream = ({ onAlertAction }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [alerts, setAlerts] = useState([]);
  const [autoScroll, setAutoScroll] = useState(true);
  const [filter, setFilter] = useState('all');
  const alertsRef = useRef(null);

  const translations = {
    en: {
      'Live Alert Stream': 'Live Alert Stream',
      'Auto Scroll': 'Auto Scroll',
      'All': 'All',
      'Critical': 'Critical',
      'Warning': 'Warning',
      'Info': 'Info',
      'Acknowledge': 'Acknowledge',
      'Escalate': 'Escalate',
      'Resolve': 'Resolve',
      'ago': 'ago',
      'just now': 'just now'
    },
    es: {
      'Live Alert Stream': 'Flujo de Alertas en Vivo',
      'Auto Scroll': 'Desplazamiento Automático',
      'All': 'Todas',
      'Critical': 'Críticas',
      'Warning': 'Advertencias',
      'Info': 'Información',
      'Acknowledge': 'Reconocer',
      'Escalate': 'Escalar',
      'Resolve': 'Resolver',
      'ago': 'hace',
      'just now': 'ahora mismo'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = (key) => translations[currentLanguage][key] || key;

  const mockAlerts = [
    {
      id: 1,
      severity: 'critical',
      title: 'Database Connection Pool Exhausted',
      message: 'Primary database connection pool has reached maximum capacity. New connections are being rejected.',
      service: 'PostgreSQL Primary',
      timestamp: new Date(Date.now() - 30000),
      status: 'active'
    },
    {
      id: 2,
      severity: 'warning',
      title: 'High Memory Usage Detected',
      message: 'Memory usage on web-server-03 has exceeded 85% threshold for the past 5 minutes.',
      service: 'Web Server 03',
      timestamp: new Date(Date.now() - 120000),
      status: 'active'
    },
    {
      id: 3,
      severity: 'critical',
      title: 'API Response Time Degradation',
      message: 'Average API response time has increased to 2.3 seconds, exceeding SLA threshold of 500ms.',
      service: 'API Gateway',
      timestamp: new Date(Date.now() - 180000),
      status: 'active'
    },
    {
      id: 4,
      severity: 'info',
      title: 'Scheduled Maintenance Started',
      message: 'Routine maintenance window has begun for cache cluster redis-cluster-01.',
      service: 'Redis Cluster',
      timestamp: new Date(Date.now() - 300000),
      status: 'acknowledged'
    },
    {
      id: 5,
      severity: 'warning',
      title: 'Disk Space Low',
      message: 'Available disk space on /var/log partition is below 15% on multiple servers.',
      service: 'File System',
      timestamp: new Date(Date.now() - 420000),
      status: 'active'
    },
    {
      id: 6,
      severity: 'critical',
      title: 'Load Balancer Health Check Failed',
      message: 'Health check failures detected on 3 out of 8 backend servers in the main load balancer pool.',
      service: 'Load Balancer',
      timestamp: new Date(Date.now() - 480000),
      status: 'escalated'
    }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);
    
    // Simulate real-time alerts
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        severity: ['critical', 'warning', 'info'][Math.floor(Math.random() * 3)],
        title: 'New System Alert',
        message: 'A new system event has been detected and requires attention.',
        service: 'System Monitor',
        timestamp: new Date(),
        status: 'active'
      };
      
      setAlerts(prev => [newAlert, ...prev.slice(0, 19)]); // Keep only 20 alerts
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (autoScroll && alertsRef.current) {
      alertsRef.current.scrollTop = 0;
    }
  }, [alerts, autoScroll]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error-50 border-error/20';
      case 'warning': return 'text-warning bg-warning-50 border-warning/20';
      case 'info': return 'text-primary bg-primary-50 border-primary/20';
      default: return 'text-text-secondary bg-surface-50 border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'acknowledged': return 'text-warning';
      case 'escalated': return 'text-error';
      case 'resolved': return 'text-success';
      default: return 'text-text-primary';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return t('just now');
    if (minutes < 60) return `${minutes}m ${t('ago')}`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ${t('ago')}`;
    const days = Math.floor(hours / 24);
    return `${days}d ${t('ago')}`;
  };

  const handleAlertAction = (alertId, action) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: action === 'resolve' ? 'resolved' : action }
        : alert
    ));
    onAlertAction?.(alertId, action);
  };

  const filteredAlerts = alerts.filter(alert => 
    filter === 'all' || alert.severity === filter
  );

  return (
    <div className="bg-surface rounded-lg border border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">{t('Live Alert Stream')}</h3>
          <Button
            variant={autoScroll ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setAutoScroll(!autoScroll)}
            iconName={autoScroll ? 'Play' : 'Pause'}
            iconSize={14}
          >
            {t('Auto Scroll')}
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {['all', 'critical', 'warning', 'info'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'primary' : 'ghost'}
              size="xs"
              onClick={() => setFilter(filterType)}
            >
              {t(filterType.charAt(0).toUpperCase() + filterType.slice(1))}
            </Button>
          ))}
        </div>
      </div>

      <div 
        ref={alertsRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{ maxHeight: '600px' }}
      >
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border transition-smooth hover:shadow-md ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getSeverityIcon(alert.severity)} 
                  size={16} 
                  className={getSeverityColor(alert.severity).split(' ')[0]}
                />
                <span className="text-sm font-medium text-text-primary">
                  {alert.title}
                </span>
              </div>
              <span className="text-xs text-text-muted">
                {formatTimeAgo(alert.timestamp)}
              </span>
            </div>

            <p className="text-sm text-text-secondary mb-2 leading-relaxed">
              {alert.message}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-text-muted">Service:</span>
                <span className="text-xs font-medium text-text-primary">
                  {alert.service}
                </span>
                <span className={`text-xs font-medium ${getStatusColor(alert.status)}`}>
                  {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                </span>
              </div>

              {alert.status === 'active' && (
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleAlertAction(alert.id, 'acknowledged')}
                    iconName="Check"
                    iconSize={12}
                  >
                    {t('Acknowledge')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleAlertAction(alert.id, 'escalated')}
                    iconName="ArrowUp"
                    iconSize={12}
                  >
                    {t('Escalate')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleAlertAction(alert.id, 'resolve')}
                    iconName="X"
                    iconSize={12}
                  >
                    {t('Resolve')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertStream;