import React from 'react';
import Icon from '../../../components/AppIcon';

const CustomerHealthMetrics = ({ currentLanguage }) => {
  const translations = {
    en: {
      'Total Customers': 'Total Customers',
      'Churn Rate': 'Churn Rate',
      'Lifetime Value': 'Lifetime Value',
      'Acquisition Cost': 'Acquisition Cost',
      'Engagement Score': 'Engagement Score',
      'Satisfaction Rating': 'Satisfaction Rating',
      'vs last month': 'vs last month',
      'vs benchmark': 'vs benchmark'
    },
    es: {
      'Total Customers': 'Clientes Totales',
      'Churn Rate': 'Tasa de Abandono',
      'Lifetime Value': 'Valor de Vida',
      'Acquisition Cost': 'Costo de Adquisición',
      'Engagement Score': 'Puntuación de Compromiso',
      'Satisfaction Rating': 'Calificación de Satisfacción',
      'vs last month': 'vs mes anterior',
      'vs benchmark': 'vs referencia'
    }
  };

  const t = (key) => translations[currentLanguage][key] || key;

  const healthMetrics = [
    {
      id: 1,
      title: t('Total Customers'),
      value: '24,847',
      change: '+12.5%',
      trend: 'up',
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      benchmark: '+8.2%'
    },
    {
      id: 2,
      title: t('Churn Rate'),
      value: '3.2%',
      change: '-0.8%',
      trend: 'down',
      icon: 'UserMinus',
      color: 'text-success',
      bgColor: 'bg-success-50',
      benchmark: '4.1%'
    },
    {
      id: 3,
      title: t('Lifetime Value'),
      value: '$2,847',
      change: '+18.3%',
      trend: 'up',
      icon: 'DollarSign',
      color: 'text-accent',
      bgColor: 'bg-accent-50',
      benchmark: '$2,340'
    },
    {
      id: 4,
      title: t('Acquisition Cost'),
      value: '$127',
      change: '-5.2%',
      trend: 'down',
      icon: 'Target',
      color: 'text-success',
      bgColor: 'bg-success-50',
      benchmark: '$145'
    },
    {
      id: 5,
      title: t('Engagement Score'),
      value: '8.4/10',
      change: '+0.3',
      trend: 'up',
      icon: 'Activity',
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      benchmark: '7.8/10'
    },
    {
      id: 6,
      title: t('Satisfaction Rating'),
      value: '4.7/5',
      change: '+0.1',
      trend: 'up',
      icon: 'Star',
      color: 'text-accent',
      bgColor: 'bg-accent-50',
      benchmark: '4.5/5'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {healthMetrics.map((metric) => (
        <div key={metric.id} className="bg-surface rounded-lg border border-border p-6 card-elevation">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${metric.bgColor}`}>
              <Icon name={metric.icon} size={24} className={metric.color} />
            </div>
            <div className="flex items-center space-x-1">
              <Icon 
                name={metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={metric.trend === 'up' ? 'text-success' : 'text-error'} 
              />
              <span className={`text-sm font-medium ${
                metric.trend === 'up' ? 'text-success' : 'text-error'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-text-secondary">{metric.title}</h3>
            <p className="text-2xl font-bold text-text-primary">{metric.value}</p>
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>{t('vs last month')}</span>
              <span>{t('vs benchmark')}: {metric.benchmark}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerHealthMetrics;