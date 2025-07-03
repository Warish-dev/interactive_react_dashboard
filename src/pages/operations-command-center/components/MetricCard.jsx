import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, unit, change, trend, threshold, status, sparklineData }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translations = {
    en: {
      'System Health': 'System Health',
      'Active Incidents': 'Active Incidents',
      'Response Time': 'Response Time',
      'Throughput': 'Throughput',
      'Error Rate': 'Error Rate',
      'Capacity Utilization': 'Capacity Utilization'
    },
    es: {
      'System Health': 'Salud del Sistema',
      'Active Incidents': 'Incidentes Activos',
      'Response Time': 'Tiempo de Respuesta',
      'Throughput': 'Rendimiento',
      'Error Rate': 'Tasa de Error',
      'Capacity Utilization': 'Utilización de Capacidad'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = (key) => translations[currentLanguage][key] || key;

  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'text-error';
      case 'warning': return 'text-warning';
      case 'healthy': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getStatusBgColor = () => {
    switch (status) {
      case 'critical': return 'bg-error-50 border-error/20';
      case 'warning': return 'bg-warning-50 border-warning/20';
      case 'healthy': return 'bg-success-50 border-success/20';
      default: return 'bg-surface-50 border-border';
    }
  };

  const getTrendIcon = () => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-error';
    return 'text-text-secondary';
  };

  const renderSparkline = () => {
    if (!sparklineData || sparklineData.length === 0) return null;

    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min || 1;

    const points = sparklineData.map((value, index) => {
      const x = (index / (sparklineData.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 15;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="60" height="20" className="opacity-60">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={getStatusColor()}
        />
      </svg>
    );
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusBgColor()} transition-smooth hover:shadow-md`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-text-secondary">{t(title)}</h3>
        <div className="flex items-center space-x-2">
          {renderSparkline()}
          <Icon 
            name={getTrendIcon()} 
            size={16} 
            className={getTrendColor()}
          />
        </div>
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className={`text-2xl font-bold ${getStatusColor()}`}>
          {value}
        </span>
        {unit && (
          <span className="text-sm text-text-muted">{unit}</span>
        )}
      </div>
      
      {change !== undefined && (
        <div className="flex items-center justify-between mt-2">
          <span className={`text-xs ${getTrendColor()}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
          {threshold && (
            <span className="text-xs text-text-muted">
              Threshold: {threshold}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default MetricCard;