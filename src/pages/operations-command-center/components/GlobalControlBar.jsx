import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const GlobalControlBar = ({ onEnvironmentChange, onRefreshToggle, onTimeRangeChange, onAlertSilence }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedEnvironment, setSelectedEnvironment] = useState('production');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [timeRange, setTimeRange] = useState('30m');
  const [alertsSilenced, setAlertsSilenced] = useState(false);

  const environments = [
    { id: 'production', name: 'Production', color: 'text-error' },
    { id: 'staging', name: 'Staging', color: 'text-warning' },
    { id: 'development', name: 'Development', color: 'text-success' }
  ];

  const refreshIntervals = [
    { value: 5, label: '5s' },
    { value: 10, label: '10s' },
    { value: 30, label: '30s' }
  ];

  const timeRanges = [
    { value: '15m', label: 'Last 15 minutes' },
    { value: '30m', label: 'Last 30 minutes' },
    { value: '1h', label: 'Last hour' },
    { value: '6h', label: 'Last 6 hours' },
    { value: '24h', label: 'Last 24 hours' }
  ];

  const translations = {
    en: {
      'Environment': 'Environment',
      'Auto Refresh': 'Auto Refresh',
      'Time Range': 'Time Range',
      'Silence Alerts': 'Silence Alerts',
      'Last 15 minutes': 'Last 15 minutes',
      'Last 30 minutes': 'Last 30 minutes',
      'Last hour': 'Last hour',
      'Last 6 hours': 'Last 6 hours',
      'Last 24 hours': 'Last 24 hours',
      'Production': 'Production',
      'Staging': 'Staging',
      'Development': 'Development'
    },
    es: {
      'Environment': 'Entorno',
      'Auto Refresh': 'Actualización Automática',
      'Time Range': 'Rango de Tiempo',
      'Silence Alerts': 'Silenciar Alertas',
      'Last 15 minutes': 'Últimos 15 minutos',
      'Last 30 minutes': 'Últimos 30 minutos',
      'Last hour': 'Última hora',
      'Last 6 hours': 'Últimas 6 horas',
      'Last 24 hours': 'Últimas 24 horas',
      'Production': 'Producción',
      'Staging': 'Preparación',
      'Development': 'Desarrollo'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = (key) => translations[currentLanguage][key] || key;

  const handleEnvironmentChange = (envId) => {
    setSelectedEnvironment(envId);
    onEnvironmentChange?.(envId);
  };

  const handleRefreshToggle = () => {
    const newAutoRefresh = !autoRefresh;
    setAutoRefresh(newAutoRefresh);
    onRefreshToggle?.(newAutoRefresh, refreshInterval);
  };

  const handleIntervalChange = (interval) => {
    setRefreshInterval(interval);
    onRefreshToggle?.(autoRefresh, interval);
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    onTimeRangeChange?.(range);
  };

  const handleAlertSilence = () => {
    const newSilenced = !alertsSilenced;
    setAlertsSilenced(newSilenced);
    onAlertSilence?.(newSilenced);
  };

  return (
    <div className="bg-surface border-b border-border p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Environment Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-text-secondary">{t('Environment')}:</span>
          <div className="flex space-x-1">
            {environments.map((env) => (
              <Button
                key={env.id}
                variant={selectedEnvironment === env.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handleEnvironmentChange(env.id)}
                className="text-xs"
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${env.color}`} />
                {t(env.name)}
              </Button>
            ))}
          </div>
        </div>

        {/* Auto Refresh Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={autoRefresh ? 'success' : 'ghost'}
              size="sm"
              onClick={handleRefreshToggle}
              iconName={autoRefresh ? 'Play' : 'Pause'}
              iconSize={14}
            >
              {t('Auto Refresh')}
            </Button>
            {autoRefresh && (
              <div className="flex space-x-1">
                {refreshIntervals.map((interval) => (
                  <Button
                    key={interval.value}
                    variant={refreshInterval === interval.value ? 'primary' : 'ghost'}
                    size="xs"
                    onClick={() => handleIntervalChange(interval.value)}
                  >
                    {interval.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Time Range Picker */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-secondary">{t('Time Range')}:</span>
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className="px-3 py-1 text-sm border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {t(range.label)}
                </option>
              ))}
            </select>
          </div>

          {/* Alert Silence Control */}
          <Button
            variant={alertsSilenced ? 'warning' : 'ghost'}
            size="sm"
            onClick={handleAlertSilence}
            iconName={alertsSilenced ? 'BellOff' : 'Bell'}
            iconSize={14}
          >
            {t('Silence Alerts')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlobalControlBar;