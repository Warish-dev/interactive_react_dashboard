import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import GlobalControls from './components/GlobalControls';
import CustomerHealthMetrics from './components/CustomerHealthMetrics';
import CustomerJourneyFunnel from './components/CustomerJourneyFunnel';
import CohortRetentionHeatmap from './components/CohortRetentionHeatmap';
import CustomerSegmentationTable from './components/CustomerSegmentationTable';

const CustomerAnalyticsHub = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [filters, setFilters] = useState({
    segment: 'all',
    dateRange: 'last-30-days',
    channel: 'all',
    metricComparison: false
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const translations = {
    en: {
      'Customer Analytics Hub': 'Customer Analytics Hub',
      'Comprehensive customer behavior insights and retention analysis': 'Comprehensive customer behavior insights and retention analysis'
    },
    es: {
      'Customer Analytics Hub': 'Centro de Análisis de Clientes',
      'Comprehensive customer behavior insights and retention analysis': 'Análisis integral del comportamiento del cliente y retención'
    }
  };

  const t = (key) => translations[currentLanguage][key] || key;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {t('Customer Analytics Hub')}
            </h1>
            <p className="text-text-secondary">
              {t('Comprehensive customer behavior insights and retention analysis')}
            </p>
          </div>

          {/* Global Controls */}
          <GlobalControls 
            currentLanguage={currentLanguage}
            onFiltersChange={handleFiltersChange}
          />

          {/* Customer Health Metrics */}
          <CustomerHealthMetrics currentLanguage={currentLanguage} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-16 gap-8 mb-8">
            {/* Customer Journey Funnel - 10 columns */}
            <div className="xl:col-span-10">
              <CustomerJourneyFunnel currentLanguage={currentLanguage} />
            </div>

            {/* Cohort Retention Heatmap - 6 columns */}
            <div className="xl:col-span-6">
              <CohortRetentionHeatmap currentLanguage={currentLanguage} />
            </div>
          </div>

          {/* Customer Segmentation Table */}
          <CustomerSegmentationTable currentLanguage={currentLanguage} />
        </div>
      </main>
    </div>
  );
};

export default CustomerAnalyticsHub;