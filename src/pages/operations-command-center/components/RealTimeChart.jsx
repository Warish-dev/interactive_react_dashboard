import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

import Button from '../../../components/ui/Button';

const RealTimeChart = ({ data, onZoomInvestigate, onClickCorrelate }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedMetrics, setSelectedMetrics] = useState(['cpu', 'memory', 'network']);
  const [zoomDomain, setZoomDomain] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const chartRef = useRef(null);

  const translations = {
    en: {
      'CPU Usage': 'CPU Usage',
      'Memory Usage': 'Memory Usage',
      'Network I/O': 'Network I/O',
      'Disk I/O': 'Disk I/O',
      'Response Time': 'Response Time',
      'Error Rate': 'Error Rate',
      'Reset Zoom': 'Reset Zoom',
      'Fullscreen': 'Fullscreen',
      'Exit Fullscreen': 'Exit Fullscreen'
    },
    es: {
      'CPU Usage': 'Uso de CPU',
      'Memory Usage': 'Uso de Memoria',
      'Network I/O': 'E/S de Red',
      'Disk I/O': 'E/S de Disco',
      'Response Time': 'Tiempo de Respuesta',
      'Error Rate': 'Tasa de Error',
      'Reset Zoom': 'Restablecer Zoom',
      'Fullscreen': 'Pantalla Completa',
      'Exit Fullscreen': 'Salir de Pantalla Completa'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = (key) => translations[currentLanguage][key] || key;

  const metrics = [
    { key: 'cpu', name: 'CPU Usage', color: '#2563EB', threshold: 80 },
    { key: 'memory', name: 'Memory Usage', color: '#DC2626', threshold: 85 },
    { key: 'network', name: 'Network I/O', color: '#059669', threshold: 90 },
    { key: 'disk', name: 'Disk I/O', color: '#D97706', threshold: 75 },
    { key: 'responseTime', name: 'Response Time', color: '#7C3AED', threshold: 500 },
    { key: 'errorRate', name: 'Error Rate', color: '#EF4444', threshold: 5 }
  ];

  const mockData = [
    { time: '10:00', cpu: 45, memory: 62, network: 34, disk: 28, responseTime: 120, errorRate: 0.5 },
    { time: '10:05', cpu: 52, memory: 68, network: 41, disk: 35, responseTime: 145, errorRate: 0.8 },
    { time: '10:10', cpu: 48, memory: 65, network: 38, disk: 32, responseTime: 135, errorRate: 0.6 },
    { time: '10:15', cpu: 67, memory: 78, network: 55, disk: 48, responseTime: 180, errorRate: 1.2 },
    { time: '10:20', cpu: 72, memory: 82, network: 62, disk: 54, responseTime: 210, errorRate: 1.8 },
    { time: '10:25', cpu: 58, memory: 71, network: 45, disk: 41, responseTime: 165, errorRate: 1.1 },
    { time: '10:30', cpu: 63, memory: 75, network: 52, disk: 46, responseTime: 175, errorRate: 1.4 }
  ];

  const handleMetricToggle = (metricKey) => {
    setSelectedMetrics(prev => 
      prev.includes(metricKey) 
        ? prev.filter(m => m !== metricKey)
        : [...prev, metricKey]
    );
  };

  const handleZoomReset = () => {
    setZoomDomain(null);
    onZoomInvestigate?.(null);
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleChartClick = (data) => {
    if (data && data.activePayload) {
      onClickCorrelate?.(data.activePayload[0].payload);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-text-primary mb-2">{`Time: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${t(entry.name)}: ${entry.value}${entry.dataKey === 'responseTime' ? 'ms' : '%'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-surface rounded-lg border border-border ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Real-Time Performance Metrics</h3>
          <div className="flex items-center space-x-2">
            {zoomDomain && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomReset}
                iconName="RotateCcw"
                iconSize={14}
              >
                {t('Reset Zoom')}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFullscreenToggle}
              iconName={isFullscreen ? 'Minimize2' : 'Maximize2'}
              iconSize={14}
            >
              {t(isFullscreen ? 'Exit Fullscreen' : 'Fullscreen')}
            </Button>
          </div>
        </div>

        {/* Metric Toggles */}
        <div className="flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <Button
              key={metric.key}
              variant={selectedMetrics.includes(metric.key) ? 'primary' : 'ghost'}
              size="xs"
              onClick={() => handleMetricToggle(metric.key)}
              className="text-xs"
            >
              <div 
                className="w-2 h-2 rounded-full mr-2" 
                style={{ backgroundColor: metric.color }}
              />
              {t(metric.name)}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className={`${isFullscreen ? 'h-96' : 'h-64'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              ref={chartRef}
              data={mockData}
              onClick={handleChartClick}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* Threshold Lines */}
              {selectedMetrics.map((metricKey) => {
                const metric = metrics.find(m => m.key === metricKey);
                return metric?.threshold ? (
                  <ReferenceLine
                    key={`threshold-${metricKey}`}
                    y={metric.threshold}
                    stroke={metric.color}
                    strokeDasharray="5 5"
                    strokeOpacity={0.5}
                  />
                ) : null;
              })}
              
              {/* Data Lines */}
              {selectedMetrics.map((metricKey) => {
                const metric = metrics.find(m => m.key === metricKey);
                return (
                  <Line
                    key={metricKey}
                    type="monotone"
                    dataKey={metricKey}
                    stroke={metric.color}
                    strokeWidth={2}
                    dot={{ fill: metric.color, strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5, stroke: metric.color, strokeWidth: 2 }}
                    name={t(metric.name)}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RealTimeChart;