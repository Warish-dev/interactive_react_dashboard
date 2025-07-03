import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CohortRetentionHeatmap = ({ currentLanguage }) => {
  const [selectedCohort, setSelectedCohort] = useState(null);

  const translations = {
    en: {
      'Cohort Retention Analysis': 'Cohort Retention Analysis',
      'Monthly Retention Patterns': 'Monthly Retention Patterns',
      'Cohort': 'Cohort',
      'Month': 'Month',
      'Retention Rate': 'Retention Rate',
      'Users': 'Users',
      'Jan': 'Jan',
      'Feb': 'Feb',
      'Mar': 'Mar',
      'Apr': 'Apr',
      'May': 'May',
      'Jun': 'Jun',
      'Jul': 'Jul',
      'Aug': 'Aug',
      'Sep': 'Sep',
      'Oct': 'Oct',
      'Nov': 'Nov',
      'Dec': 'Dec'
    },
    es: {
      'Cohort Retention Analysis': 'Análisis de Retención de Cohorte',
      'Monthly Retention Patterns': 'Patrones de Retención Mensual',
      'Cohort': 'Cohorte',
      'Month': 'Mes',
      'Retention Rate': 'Tasa de Retención',
      'Users': 'Usuarios',
      'Jan': 'Ene',
      'Feb': 'Feb',
      'Mar': 'Mar',
      'Apr': 'Abr',
      'May': 'May',
      'Jun': 'Jun',
      'Jul': 'Jul',
      'Aug': 'Ago',
      'Sep': 'Sep',
      'Oct': 'Oct',
      'Nov': 'Nov',
      'Dec': 'Dic'
    }
  };

  const t = (key) => translations[currentLanguage][key] || key;

  const cohortData = [
    {
      cohort: `${t('Jan')} 2024`,
      users: 2847,
      retention: [100, 68, 45, 38, 32, 28, 25, 23, 21, 19, 18, 17]
    },
    {
      cohort: `${t('Feb')} 2024`,
      users: 3124,
      retention: [100, 72, 48, 41, 35, 31, 28, 26, 24, 22, 20, null]
    },
    {
      cohort: `${t('Mar')} 2024`,
      users: 2956,
      retention: [100, 69, 46, 39, 33, 29, 26, 24, 22, 20, null, null]
    },
    {
      cohort: `${t('Apr')} 2024`,
      users: 3287,
      retention: [100, 74, 51, 43, 37, 33, 30, 28, 26, null, null, null]
    },
    {
      cohort: `${t('May')} 2024`,
      users: 3456,
      retention: [100, 71, 49, 42, 36, 32, 29, 27, null, null, null, null]
    },
    {
      cohort: `${t('Jun')} 2024`,
      users: 3189,
      retention: [100, 76, 53, 45, 39, 35, 32, null, null, null, null, null]
    },
    {
      cohort: `${t('Jul')} 2024`,
      users: 3567,
      retention: [100, 73, 50, 43, 37, 33, null, null, null, null, null, null]
    },
    {
      cohort: `${t('Aug')} 2024`,
      users: 3234,
      retention: [100, 78, 55, 47, 41, null, null, null, null, null, null, null]
    },
    {
      cohort: `${t('Sep')} 2024`,
      users: 3678,
      retention: [100, 75, 52, 44, null, null, null, null, null, null, null, null]
    },
    {
      cohort: `${t('Oct')} 2024`,
      users: 3445,
      retention: [100, 79, 56, null, null, null, null, null, null, null, null, null]
    },
    {
      cohort: `${t('Nov')} 2024`,
      users: 3789,
      retention: [100, 77, null, null, null, null, null, null, null, null, null, null]
    },
    {
      cohort: `${t('Dec')} 2024`,
      users: 3567,
      retention: [100, null, null, null, null, null, null, null, null, null, null, null]
    }
  ];

  const getHeatmapColor = (value) => {
    if (value === null) return 'bg-gray-100';
    if (value >= 70) return 'bg-success-500';
    if (value >= 50) return 'bg-success-400';
    if (value >= 30) return 'bg-accent-400';
    if (value >= 20) return 'bg-warning-400';
    return 'bg-error-400';
  };

  const getTextColor = (value) => {
    if (value === null) return 'text-gray-400';
    if (value >= 30) return 'text-white';
    return 'text-gray-700';
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{t('Cohort Retention Analysis')}</h3>
          <p className="text-sm text-text-secondary">{t('Monthly Retention Patterns')}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-text-muted" />
          <span className="text-sm text-text-muted">2024</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid grid-cols-14 gap-1 mb-2">
            <div className="text-xs font-medium text-text-secondary p-2">{t('Cohort')}</div>
            <div className="text-xs font-medium text-text-secondary p-2 text-center">{t('Users')}</div>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="text-xs font-medium text-text-secondary p-2 text-center">
                {t('Month')} {i + 1}
              </div>
            ))}
          </div>

          {/* Heatmap Data */}
          <div className="space-y-1">
            {cohortData.map((cohort, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-14 gap-1 ${
                  selectedCohort === index ? 'ring-2 ring-primary ring-offset-1 rounded' : ''
                }`}
                onClick={() => setSelectedCohort(selectedCohort === index ? null : index)}
              >
                <div className="text-xs font-medium text-text-primary p-2 bg-surface-50 rounded">
                  {cohort.cohort}
                </div>
                <div className="text-xs text-text-secondary p-2 text-center bg-surface-50 rounded">
                  {cohort.users.toLocaleString()}
                </div>
                {cohort.retention.map((value, monthIndex) => (
                  <div
                    key={monthIndex}
                    className={`text-xs p-2 text-center rounded cursor-pointer transition-all duration-200 hover:scale-105 ${getHeatmapColor(value)} ${getTextColor(value)}`}
                    title={value ? `${t('Retention Rate')}: ${value}%` : 'No data'}
                  >
                    {value ? `${value}%` : '-'}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <span className="text-xs text-text-secondary">{t('Retention Rate')}:</span>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error-400 rounded"></div>
            <span className="text-xs text-text-muted">&lt;20%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning-400 rounded"></div>
            <span className="text-xs text-text-muted">20-30%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent-400 rounded"></div>
            <span className="text-xs text-text-muted">30-50%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success-400 rounded"></div>
            <span className="text-xs text-text-muted">50-70%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success-500 rounded"></div>
            <span className="text-xs text-text-muted">&gt;70%</span>
          </div>
        </div>
        
        {selectedCohort !== null && (
          <div className="text-xs text-text-muted">
            Selected: {cohortData[selectedCohort].cohort}
          </div>
        )}
      </div>
    </div>
  );
};

export default CohortRetentionHeatmap;