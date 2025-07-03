import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const GlobalControls = ({ currentLanguage, onFiltersChange }) => {
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [dateRange, setDateRange] = useState('last-30-days');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [metricComparison, setMetricComparison] = useState(false);

  const translations = {
    en: {
      'Customer Segment': 'Customer Segment',
      'Date Range': 'Date Range',
      'Channel Filter': 'Channel Filter',
      'Metric Comparison': 'Metric Comparison',
      'All Segments': 'All Segments',
      'High Value': 'High Value',
      'Loyal Customers': 'Loyal Customers',
      'At Risk': 'At Risk',
      'New Customers': 'New Customers',
      'Inactive': 'Inactive',
      'Last 7 days': 'Last 7 days',
      'Last 30 days': 'Last 30 days',
      'Last 90 days': 'Last 90 days',
      'Last 6 months': 'Last 6 months',
      'Last 12 months': 'Last 12 months',
      'Custom Range': 'Custom Range',
      'All Channels': 'All Channels',
      'Email': 'Email',
      'Social Media': 'Social Media',
      'Direct': 'Direct',
      'Paid Search': 'Paid Search',
      'Organic Search': 'Organic Search',
      'Referral': 'Referral',
      'Export Data': 'Export Data',
      'Refresh': 'Refresh',
      'Compare with previous period': 'Compare with previous period',
      'Last updated': 'Last updated',
      'minutes ago': 'minutes ago'
    },
    es: {
      'Customer Segment': 'Segmento de Cliente',
      'Date Range': 'Rango de Fechas',
      'Channel Filter': 'Filtro de Canal',
      'Metric Comparison': 'Comparación de Métricas',
      'All Segments': 'Todos los Segmentos',
      'High Value': 'Alto Valor',
      'Loyal Customers': 'Clientes Leales',
      'At Risk': 'En Riesgo',
      'New Customers': 'Nuevos Clientes',
      'Inactive': 'Inactivo',
      'Last 7 days': 'Últimos 7 días',
      'Last 30 days': 'Últimos 30 días',
      'Last 90 days': 'Últimos 90 días',
      'Last 6 months': 'Últimos 6 meses',
      'Last 12 months': 'Últimos 12 meses',
      'Custom Range': 'Rango Personalizado',
      'All Channels': 'Todos los Canales',
      'Email': 'Correo',
      'Social Media': 'Redes Sociales',
      'Direct': 'Directo',
      'Paid Search': 'Búsqueda Pagada',
      'Organic Search': 'Búsqueda Orgánica',
      'Referral': 'Referencia',
      'Export Data': 'Exportar Datos',
      'Refresh': 'Actualizar',
      'Compare with previous period': 'Comparar con período anterior',
      'Last updated': 'Última actualización',
      'minutes ago': 'minutos atrás'
    }
  };

  const t = (key) => translations[currentLanguage][key] || key;

  const customerSegments = [
    { value: 'all', label: t('All Segments') },
    { value: 'high-value', label: t('High Value') },
    { value: 'loyal', label: t('Loyal Customers') },
    { value: 'at-risk', label: t('At Risk') },
    { value: 'new', label: t('New Customers') },
    { value: 'inactive', label: t('Inactive') }
  ];

  const dateRanges = [
    { value: 'last-7-days', label: t('Last 7 days') },
    { value: 'last-30-days', label: t('Last 30 days') },
    { value: 'last-90-days', label: t('Last 90 days') },
    { value: 'last-6-months', label: t('Last 6 months') },
    { value: 'last-12-months', label: t('Last 12 months') },
    { value: 'custom', label: t('Custom Range') }
  ];

  const channels = [
    { value: 'all', label: t('All Channels') },
    { value: 'email', label: t('Email') },
    { value: 'social', label: t('Social Media') },
    { value: 'direct', label: t('Direct') },
    { value: 'paid-search', label: t('Paid Search') },
    { value: 'organic-search', label: t('Organic Search') },
    { value: 'referral', label: t('Referral') }
  ];

  const handleFilterChange = (filterType, value) => {
    const filters = {
      segment: selectedSegment,
      dateRange: dateRange,
      channel: selectedChannel,
      metricComparison: metricComparison
    };

    filters[filterType] = value;

    switch (filterType) {
      case 'segment':
        setSelectedSegment(value);
        break;
      case 'dateRange':
        setDateRange(value);
        break;
      case 'channel':
        setSelectedChannel(value);
        break;
      case 'metricComparison':
        setMetricComparison(value);
        break;
    }

    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 mb-8 card-elevation">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Customer Segment Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">{t('Customer Segment')}</label>
          <div className="relative">
            <select
              value={selectedSegment}
              onChange={(e) => handleFilterChange('segment', e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
            >
              {customerSegments.map((segment) => (
                <option key={segment.value} value={segment.value}>
                  {segment.label}
                </option>
              ))}
            </select>
            <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">{t('Date Range')}</label>
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <Icon name="Calendar" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
        </div>

        {/* Channel Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">{t('Channel Filter')}</label>
          <div className="relative">
            <select
              value={selectedChannel}
              onChange={(e) => handleFilterChange('channel', e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
            >
              {channels.map((channel) => (
                <option key={channel.value} value={channel.value}>
                  {channel.label}
                </option>
              ))}
            </select>
            <Icon name="Filter" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">&nbsp;</label>
          <div className="flex items-center space-x-2">
            <Button variant="outline" iconName="Download" className="flex-1">
              {t('Export Data')}
            </Button>
            <Button variant="ghost" iconName="RefreshCw" className="px-3">
              {t('Refresh')}
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Controls */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={metricComparison}
              onChange={(e) => handleFilterChange('metricComparison', e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-text-secondary">{t('Compare with previous period')}</span>
          </label>
        </div>

        <div className="flex items-center space-x-2 text-xs text-text-muted">
          <Icon name="Clock" size={14} />
          <span>{t('Last updated')}: 5 {t('minutes ago')}</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;