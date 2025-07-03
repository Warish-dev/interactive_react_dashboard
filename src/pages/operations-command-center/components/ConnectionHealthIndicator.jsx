import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ConnectionHealthIndicator = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [connectionStatus, setConnectionStatus] = useState({
    websocket: 'connected',
    database: 'connected',
    api: 'connected',
    monitoring: 'connected'
  });
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const translations = {
    en: {
      'Connection Health': 'Connection Health',
      'WebSocket': 'WebSocket',
      'Database': 'Database',
      'API': 'API',
      'Monitoring': 'Monitoring',
      'Connected': 'Connected',
      'Disconnected': 'Disconnected',
      'Reconnecting': 'Reconnecting',
      'Last Update': 'Last Update'
    },
    es: {
      'Connection Health': 'Salud de Conexión',
      'WebSocket': 'WebSocket',
      'Database': 'Base de Datos',
      'API': 'API',
      'Monitoring': 'Monitoreo',
      'Connected': 'Conectado',
      'Disconnected': 'Desconectado',
      'Reconnecting': 'Reconectando',
      'Last Update': 'Última Actualización'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = (key) => translations[currentLanguage][key] || key;

  useEffect(() => {
    // Simulate connection status updates
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      // Occasionally simulate connection issues
      if (Math.random() < 0.1) {
        const services = Object.keys(connectionStatus);
        const randomService = services[Math.floor(Math.random() * services.length)];
        const statuses = ['connected', 'disconnected', 'reconnecting'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        setConnectionStatus(prev => ({
          ...prev,
          [randomService]: randomStatus
        }));
        
        // Auto-recover after a few seconds
        setTimeout(() => {
          setConnectionStatus(prev => ({
            ...prev,
            [randomService]: 'connected'
          }));
        }, 3000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [connectionStatus]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'disconnected': return 'text-error';
      case 'reconnecting': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'disconnected': return 'XCircle';
      case 'reconnecting': return 'RotateCw';
      default: return 'Circle';
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString(currentLanguage === 'es' ? 'es-ES' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-text-primary">{t('Connection Health')}</h4>
        <span className="text-xs text-text-muted">
          {t('Last Update')}: {formatTime(lastUpdate)}
        </span>
      </div>

      <div className="space-y-3">
        {Object.entries(connectionStatus).map(([service, status]) => (
          <div key={service} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(status)} 
                size={16} 
                className={`${getStatusColor(status)} ${status === 'reconnecting' ? 'animate-spin' : ''}`}
              />
              <span className="text-sm text-text-primary">
                {t(service.charAt(0).toUpperCase() + service.slice(1))}
              </span>
            </div>
            <span className={`text-xs font-medium ${getStatusColor(status)}`}>
              {t(status.charAt(0).toUpperCase() + status.slice(1))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionHealthIndicator;