import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CustomerJourneyFunnel = ({ currentLanguage }) => {
  const [selectedStage, setSelectedStage] = useState(null);

  const translations = {
    en: {
      'Customer Journey Funnel': 'Customer Journey Funnel',
      'Stage-wise Conversion Analysis': 'Stage-wise Conversion Analysis',
      'Awareness': 'Awareness',
      'Interest': 'Interest',
      'Consideration': 'Consideration',
      'Purchase': 'Purchase',
      'Retention': 'Retention',
      'Advocacy': 'Advocacy',
      'Conversion Rate': 'Conversion Rate',
      'Drop-off Rate': 'Drop-off Rate',
      'Total Users': 'Total Users',
      'Click to segment': 'Click to segment'
    },
    es: {
      'Customer Journey Funnel': 'Embudo de Viaje del Cliente',
      'Stage-wise Conversion Analysis': 'Análisis de Conversión por Etapa',
      'Awareness': 'Conciencia',
      'Interest': 'Interés',
      'Consideration': 'Consideración',
      'Purchase': 'Compra',
      'Retention': 'Retención',
      'Advocacy': 'Defensa',
      'Conversion Rate': 'Tasa de Conversión',
      'Drop-off Rate': 'Tasa de Abandono',
      'Total Users': 'Usuarios Totales',
      'Click to segment': 'Clic para segmentar'
    }
  };

  const t = (key) => translations[currentLanguage][key] || key;

  const funnelStages = [
    {
      id: 1,
      stage: t('Awareness'),
      users: 125000,
      conversionRate: 100,
      dropOffRate: 0,
      color: 'bg-primary-500',
      width: 'w-full'
    },
    {
      id: 2,
      stage: t('Interest'),
      users: 87500,
      conversionRate: 70,
      dropOffRate: 30,
      color: 'bg-primary-400',
      width: 'w-5/6'
    },
    {
      id: 3,
      stage: t('Consideration'),
      users: 56250,
      conversionRate: 45,
      dropOffRate: 25,
      color: 'bg-accent-500',
      width: 'w-4/6'
    },
    {
      id: 4,
      stage: t('Purchase'),
      users: 31250,
      conversionRate: 25,
      dropOffRate: 20,
      color: 'bg-success-500',
      width: 'w-3/6'
    },
    {
      id: 5,
      stage: t('Retention'),
      users: 24375,
      conversionRate: 19.5,
      dropOffRate: 5.5,
      color: 'bg-secondary-500',
      width: 'w-2/6'
    },
    {
      id: 6,
      stage: t('Advocacy'),
      users: 18750,
      conversionRate: 15,
      dropOffRate: 4.5,
      color: 'bg-accent-600',
      width: 'w-1/6'
    }
  ];

  const handleStageClick = (stage) => {
    setSelectedStage(selectedStage?.id === stage.id ? null : stage);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{t('Customer Journey Funnel')}</h3>
          <p className="text-sm text-text-secondary">{t('Stage-wise Conversion Analysis')}</p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-text-muted">
          <Icon name="Info" size={14} />
          <span>{t('Click to segment')}</span>
        </div>
      </div>

      <div className="space-y-4">
        {funnelStages.map((stage, index) => (
          <div key={stage.id} className="relative">
            <div 
              className={`${stage.color} ${stage.width} mx-auto rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                selectedStage?.id === stage.id ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
              onClick={() => handleStageClick(stage)}
            >
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold">{stage.stage}</span>
                  <div className="w-px h-4 bg-white/30" />
                  <span className="text-sm opacity-90">{stage.users.toLocaleString()} users</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{stage.conversionRate}%</div>
                    <div className="text-xs opacity-75">{t('Conversion Rate')}</div>
                  </div>
                  {index > 0 && (
                    <div className="text-right">
                      <div className="text-sm font-medium">-{stage.dropOffRate}%</div>
                      <div className="text-xs opacity-75">{t('Drop-off Rate')}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {index < funnelStages.length - 1 && (
              <div className="flex justify-center my-2">
                <Icon name="ChevronDown" size={16} className="text-text-muted" />
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedStage && (
        <div className="mt-6 p-4 bg-surface-50 rounded-lg border border-border">
          <h4 className="font-medium text-text-primary mb-2">{selectedStage.stage} - Detailed Analysis</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-text-secondary">{t('Total Users')}</span>
              <p className="font-semibold text-text-primary">{selectedStage.users.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-text-secondary">{t('Conversion Rate')}</span>
              <p className="font-semibold text-success">{selectedStage.conversionRate}%</p>
            </div>
            {selectedStage.dropOffRate > 0 && (
              <div>
                <span className="text-text-secondary">{t('Drop-off Rate')}</span>
                <p className="font-semibold text-error">{selectedStage.dropOffRate}%</p>
              </div>
            )}
            <div>
              <span className="text-text-secondary">Segment Size</span>
              <p className="font-semibold text-primary">{Math.round(selectedStage.users * 0.15).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerJourneyFunnel;