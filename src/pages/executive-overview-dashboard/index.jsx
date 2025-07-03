import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import RevenueChart from './components/RevenueChart';
import ExecutiveAlerts from './components/ExecutiveAlerts';
import PerformanceScorecard from './components/PerformanceScorecard';
import DashboardFilters from './components/DashboardFilters';

const ExecutiveOverviewDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [filters, setFilters] = useState({
    dateRange: 'Q4 2024',
    department: 'All Departments',
    comparison: true
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      'Executive Overview Dashboard': 'Executive Overview Dashboard',
      'Strategic Performance Monitoring': 'Strategic Performance Monitoring',
      'Total Revenue': 'Total Revenue',
      'Customer Acquisition': 'Customer Acquisition',
      'Operational Efficiency': 'Operational Efficiency',
      'Profitability Margin': 'Profitability Margin',
      'vs last quarter': 'vs last quarter',
      'vs last month': 'vs last month',
      'vs target': 'vs target',
      'New customers this quarter': 'New customers this quarter',
      'Overall system efficiency': 'Overall system efficiency',
      'Net profit margin': 'Net profit margin'
    },
    es: {
      'Executive Overview Dashboard': 'Panel de Resumen Ejecutivo',
      'Strategic Performance Monitoring': 'Monitoreo de Rendimiento Estratégico',
      'Total Revenue': 'Ingresos Totales',
      'Customer Acquisition': 'Adquisición de Clientes',
      'Operational Efficiency': 'Eficiencia Operacional',
      'Profitability Margin': 'Margen de Rentabilidad',
      'vs last quarter': 'vs trimestre anterior',
      'vs last month': 'vs mes anterior',
      'vs target': 'vs objetivo',
      'New customers this quarter': 'Nuevos clientes este trimestre',
      'Overall system efficiency': 'Eficiencia general del sistema',
      'Net profit margin': 'Margen de beneficio neto'
    }
  };

  const t = (key) => translations[currentLanguage][key] || key;

  const kpiData = [
    {
      title: t('Total Revenue'),
      value: '$4.2M',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'DollarSign',
      trend: 'up',
      subtitle: t('vs last quarter')
    },
    {
      title: t('Customer Acquisition'),
      value: '2,847',
      change: '+8.3%',
      changeType: 'positive',
      icon: 'Users',
      trend: 'up',
      subtitle: t('New customers this quarter')
    },
    {
      title: t('Operational Efficiency'),
      value: '87%',
      change: '-3.2%',
      changeType: 'negative',
      icon: 'Activity',
      trend: 'down',
      subtitle: t('Overall system efficiency')
    },
    {
      title: t('Profitability Margin'),
      value: '24.1%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'TrendingUp',
      trend: 'up',
      subtitle: t('Net profit margin')
    }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real application, this would trigger data refetch
    console.log('Filters updated:', newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-15">
        {/* Dashboard Filters */}
        <DashboardFilters onFiltersChange={handleFiltersChange} />
        
        {/* Page Header */}
        <div className="px-4 py-6 border-b border-border bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  {t('Executive Overview Dashboard')}
                </h1>
                <p className="text-text-secondary mt-1">
                  {t('Strategic Performance Monitoring')} • {filters.dateRange} • {filters.department}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-text-secondary">Live Data</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="px-4 py-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiData.map((kpi, index) => (
                <KPICard
                  key={index}
                  title={kpi.title}
                  value={kpi.value}
                  change={kpi.change}
                  changeType={kpi.changeType}
                  icon={kpi.icon}
                  trend={kpi.trend}
                  subtitle={kpi.subtitle}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Revenue Chart - 8 columns */}
              <div className="lg:col-span-8">
                <RevenueChart />
              </div>

              {/* Executive Alerts - 4 columns */}
              <div className="lg:col-span-4">
                <ExecutiveAlerts />
              </div>
            </div>

            {/* Performance Scorecard - Full Width */}
            <div className="w-full">
              <PerformanceScorecard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExecutiveOverviewDashboard;