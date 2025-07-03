import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import FilterPanel from './components/FilterPanel';
import RevenueChart from './components/RevenueChart';
import LeaderboardPanel from './components/LeaderboardPanel';
import PipelineFunnel from './components/PipelineFunnel';
import DataRefreshStatus from './components/DataRefreshStatus';

import Button from '../../components/ui/Button';

const SalesAnalyticsDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isExporting, setIsExporting] = useState(false);

  const translations = {
    en: {
      'Sales Analytics Dashboard': 'Sales Analytics Dashboard',
      'Comprehensive performance tracking and revenue forecasting': 'Comprehensive performance tracking and revenue forecasting',
      'Revenue Achievement': 'Revenue Achievement',
      'Conversion Rate': 'Conversion Rate',
      'Average Deal Size': 'Average Deal Size',
      'Sales Velocity': 'Sales Velocity',
      'Export Dashboard': 'Export Dashboard',
      'Schedule Report': 'Schedule Report',
      'Forecast Scenarios': 'Forecast Scenarios'
    },
    es: {
      'Sales Analytics Dashboard': 'Panel de Análisis de Ventas',
      'Comprehensive performance tracking and revenue forecasting': 'Seguimiento integral del rendimiento y pronóstico de ingresos',
      'Revenue Achievement': 'Logro de Ingresos',
      'Conversion Rate': 'Tasa de Conversión',
      'Average Deal Size': 'Tamaño Promedio del Trato',
      'Sales Velocity': 'Velocidad de Ventas',
      'Export Dashboard': 'Exportar Panel',
      'Schedule Report': 'Programar Reporte',
      'Forecast Scenarios': 'Escenarios de Pronóstico'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = (key) => translations[currentLanguage][key] || key;

  const metricsData = [
    {
      title: t('Revenue Achievement'),
      value: '$14.9M',
      change: 24.3,
      target: '$15.2M',
      icon: 'DollarSign',
      color: 'primary'
    },
    {
      title: t('Conversion Rate'),
      value: '16.2%',
      change: 8.7,
      target: '18.0%',
      icon: 'Target',
      color: 'success'
    },
    {
      title: t('Average Deal Size'),
      value: '$13.2K',
      change: 12.1,
      target: '$14.0K',
      icon: 'TrendingUp',
      color: 'accent'
    },
    {
      title: t('Sales Velocity'),
      value: '45 days',
      change: -5.2,
      target: '42 days',
      icon: 'Zap',
      color: 'warning'
    }
  ];

  const handleFiltersChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Exporting dashboard in ${format} format`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDataRefresh = () => {
    console.log('Refreshing dashboard data...');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">
                  {t('Sales Analytics Dashboard')}
                </h1>
                <p className="text-text-secondary mt-2">
                  {t('Comprehensive performance tracking and revenue forecasting')}
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  iconName="Calendar"
                  onClick={() => handleExport('schedule')}
                  className="text-sm"
                >
                  {t('Schedule Report')}
                </Button>
                
                <Button
                  variant="outline"
                  iconName="BarChart3"
                  className="text-sm"
                >
                  {t('Forecast Scenarios')}
                </Button>
                
                <div className="relative">
                  <Button
                    variant="primary"
                    iconName="Download"
                    disabled={isExporting}
                    className="text-sm"
                  >
                    {isExporting ? 'Exporting...' : t('Export Dashboard')}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Data Refresh Status */}
          <DataRefreshStatus onRefresh={handleDataRefresh} />

          {/* Advanced Filters */}
          <FilterPanel
            onFiltersChange={handleFiltersChange}
            isCollapsed={isFiltersCollapsed}
            onToggleCollapse={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
          />

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                target={metric.target}
                icon={metric.icon}
                color={metric.color}
              />
            ))}
          </div>

          {/* Main Analysis Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Revenue Chart - 8 columns equivalent */}
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            
            {/* Leaderboard Panel - 4 columns equivalent */}
            <div className="lg:col-span-1">
              <LeaderboardPanel />
            </div>
          </div>

          {/* Pipeline Funnel - Full Width */}
          <div className="mb-8">
            <PipelineFunnel />
          </div>

          {/* Additional Analytics Actions */}
          <div className="bg-surface rounded-lg border border-border p-6 card-elevation">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Advanced Analytics
                </h3>
                <p className="text-sm text-text-secondary">
                  Dive deeper into your sales data with specialized analysis tools
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" iconName="Users" className="text-sm">
                  Cohort Analysis
                </Button>
                <Button variant="outline" iconName="TrendingUp" className="text-sm">
                  Forecast Modeling
                </Button>
                <Button variant="outline" iconName="Calendar" className="text-sm">
                  Custom Date Ranges
                </Button>
                <Button variant="outline" iconName="FileText" className="text-sm">
                  PowerPoint Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalesAnalyticsDashboard;