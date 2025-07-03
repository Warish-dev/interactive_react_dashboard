import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import GlobalControlBar from './components/GlobalControlBar';
import MetricCard from './components/MetricCard';
import RealTimeChart from './components/RealTimeChart';
import AlertStream from './components/AlertStream';
import IncidentTable from './components/IncidentTable';
import ConnectionHealthIndicator from './components/ConnectionHealthIndicator';

const OperationsCommandCenter = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedEnvironment, setSelectedEnvironment] = useState('production');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [timeRange, setTimeRange] = useState('30m');
  const [alertsSilenced, setAlertsSilenced] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const translations = {
    en: {
      'Operations Command Center': 'Operations Command Center',
      'Real-time system monitoring and incident management for DevOps teams': 'Real-time system monitoring and incident management for DevOps teams'
    },
    es: {
      'Operations Command Center': 'Centro de Comando de Operaciones',
      'Real-time system monitoring and incident management for DevOps teams': 'Monitoreo de sistemas en tiempo real y gestión de incidentes para equipos DevOps'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = (key) => translations[currentLanguage][key] || key;

  // Mock metric data with sparklines
  const systemMetrics = [
    {
      title: 'System Health',
      value: '94.2',
      unit: '%',
      change: -2.1,
      trend: -1,
      threshold: 95,
      status: 'warning',
      sparklineData: [96, 95, 94, 93, 94, 95, 94]
    },
    {
      title: 'Active Incidents',
      value: '4',
      unit: '',
      change: 1,
      trend: 1,
      threshold: 5,
      status: 'warning',
      sparklineData: [2, 3, 4, 3, 4, 5, 4]
    },
    {
      title: 'Response Time',
      value: '245',
      unit: 'ms',
      change: 12.5,
      trend: 1,
      threshold: 500,
      status: 'healthy',
      sparklineData: [220, 235, 240, 250, 245, 240, 245]
    },
    {
      title: 'Throughput',
      value: '1,247',
      unit: 'req/s',
      change: -5.2,
      trend: -1,
      threshold: 1000,
      status: 'healthy',
      sparklineData: [1300, 1280, 1250, 1240, 1245, 1250, 1247]
    },
    {
      title: 'Error Rate',
      value: '0.8',
      unit: '%',
      change: 0.3,
      trend: 1,
      threshold: 2,
      status: 'healthy',
      sparklineData: [0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.8]
    },
    {
      title: 'Capacity Utilization',
      value: '78',
      unit: '%',
      change: 5.1,
      trend: 1,
      threshold: 85,
      status: 'healthy',
      sparklineData: [75, 76, 77, 78, 79, 78, 78]
    }
  ];

  const handleEnvironmentChange = (environment) => {
    setSelectedEnvironment(environment);
  };

  const handleRefreshToggle = (enabled, interval) => {
    setAutoRefresh(enabled);
    setRefreshInterval(interval);
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const handleAlertSilence = (silenced) => {
    setAlertsSilenced(silenced);
  };

  const handleZoomInvestigate = (zoomData) => {
    console.log('Zoom investigate:', zoomData);
  };

  const handleClickCorrelate = (correlationData) => {
    console.log('Click correlate:', correlationData);
  };

  const handleAlertAction = (alertId, action) => {
    console.log('Alert action:', alertId, action);
  };

  const handleIncidentSelect = (incident) => {
    setSelectedIncident(incident);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-15">
        {/* Global Control Bar */}
        <GlobalControlBar
          onEnvironmentChange={handleEnvironmentChange}
          onRefreshToggle={handleRefreshToggle}
          onTimeRangeChange={handleTimeRangeChange}
          onAlertSilence={handleAlertSilence}
        />

        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {t('Operations Command Center')}
            </h1>
            <p className="text-text-secondary">
              {t('Real-time system monitoring and incident management for DevOps teams')}
            </p>
          </div>

          {/* Primary Status Row - 6 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {systemMetrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                unit={metric.unit}
                change={metric.change}
                trend={metric.trend}
                threshold={metric.threshold}
                status={metric.status}
                sparklineData={metric.sparklineData}
              />
            ))}
          </div>

          {/* Main Monitoring Area */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Real-time Chart (16 columns equivalent - 2/3 width) */}
            <div className="xl:col-span-2">
              <RealTimeChart
                onZoomInvestigate={handleZoomInvestigate}
                onClickCorrelate={handleClickCorrelate}
              />
            </div>

            {/* Right Panel (8 columns equivalent - 1/3 width) */}
            <div className="space-y-6">
              {/* Alert Stream */}
              <AlertStream onAlertAction={handleAlertAction} />
              
              {/* Connection Health Indicator */}
              <ConnectionHealthIndicator />
            </div>
          </div>

          {/* Incident Table */}
          <div className="mt-6">
            <IncidentTable onIncidentSelect={handleIncidentSelect} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsCommandCenter;