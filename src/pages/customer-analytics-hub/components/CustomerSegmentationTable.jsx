import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerSegmentationTable = ({ currentLanguage }) => {
  const [sortField, setSortField] = useState('customers');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedSegments, setSelectedSegments] = useState([]);

  const translations = {
    en: {
      'Customer Segmentation Analysis': 'Customer Segmentation Analysis',
      'Behavioral Clusters & Revenue Contribution': 'Behavioral Clusters & Revenue Contribution',
      'Segment': 'Segment',
      'Customers': 'Customers',
      'Engagement': 'Engagement',
      'Revenue': 'Revenue',
      'Risk Score': 'Risk Score',
      'Actions': 'Actions',
      'High Value': 'High Value',
      'Loyal Customers': 'Loyal Customers',
      'At Risk': 'At Risk',
      'New Customers': 'New Customers',
      'Price Sensitive': 'Price Sensitive',
      'Inactive': 'Inactive',
      'Champions': 'Champions',
      'Potential Loyalists': 'Potential Loyalists',
      'Create Campaign': 'Create Campaign',
      'Export List': 'Export List',
      'View Details': 'View Details',
      'Low': 'Low',
      'Medium': 'Medium',
      'High': 'High',
      'Very High': 'Very High',
      'Selected': 'Selected',
      'segments': 'segments'
    },
    es: {
      'Customer Segmentation Analysis': 'Análisis de Segmentación de Clientes',
      'Behavioral Clusters & Revenue Contribution': 'Grupos de Comportamiento y Contribución de Ingresos',
      'Segment': 'Segmento',
      'Customers': 'Clientes',
      'Engagement': 'Compromiso',
      'Revenue': 'Ingresos',
      'Risk Score': 'Puntuación de Riesgo',
      'Actions': 'Acciones',
      'High Value': 'Alto Valor',
      'Loyal Customers': 'Clientes Leales',
      'At Risk': 'En Riesgo',
      'New Customers': 'Nuevos Clientes',
      'Price Sensitive': 'Sensible al Precio',
      'Inactive': 'Inactivo',
      'Champions': 'Campeones',
      'Potential Loyalists': 'Leales Potenciales',
      'Create Campaign': 'Crear Campaña',
      'Export List': 'Exportar Lista',
      'View Details': 'Ver Detalles',
      'Low': 'Bajo',
      'Medium': 'Medio',
      'High': 'Alto',
      'Very High': 'Muy Alto',
      'Selected': 'Seleccionado',
      'segments': 'segmentos'
    }
  };

  const t = (key) => translations[currentLanguage][key] || key;

  const segmentationData = [
    {
      id: 1,
      segment: t('Champions'),
      customers: 3247,
      engagement: 9.2,
      revenue: 2847000,
      riskScore: 'Low',
      description: 'High value, highly engaged customers',
      color: 'bg-success-100 text-success-800',
      riskColor: 'text-success'
    },
    {
      id: 2,
      segment: t('High Value'),
      customers: 2156,
      engagement: 8.7,
      revenue: 1956000,
      riskScore: 'Low',
      description: 'High spending, moderate engagement',
      color: 'bg-primary-100 text-primary-800',
      riskColor: 'text-success'
    },
    {
      id: 3,
      segment: t('Loyal Customers'),
      customers: 4823,
      engagement: 8.1,
      revenue: 1234000,
      riskScore: 'Medium',
      description: 'Consistent purchasers, good engagement',
      color: 'bg-accent-100 text-accent-800',
      riskColor: 'text-warning'
    },
    {
      id: 4,
      segment: t('Potential Loyalists'),
      customers: 3567,
      engagement: 7.4,
      revenue: 987000,
      riskScore: 'Medium',
      description: 'Recent customers with potential',
      color: 'bg-secondary-100 text-secondary-800',
      riskColor: 'text-warning'
    },
    {
      id: 5,
      segment: t('New Customers'),
      customers: 2934,
      engagement: 6.8,
      revenue: 567000,
      riskScore: 'Medium',
      description: 'Recently acquired customers',
      color: 'bg-primary-100 text-primary-800',
      riskColor: 'text-warning'
    },
    {
      id: 6,
      segment: t('At Risk'),
      customers: 1876,
      engagement: 4.2,
      revenue: 234000,
      riskScore: 'High',
      description: 'Declining engagement, need attention',
      color: 'bg-warning-100 text-warning-800',
      riskColor: 'text-error'
    },
    {
      id: 7,
      segment: t('Price Sensitive'),
      customers: 2145,
      engagement: 5.6,
      revenue: 345000,
      riskScore: 'Medium',
      description: 'Responds to discounts and promotions',
      color: 'bg-accent-100 text-accent-800',
      riskColor: 'text-warning'
    },
    {
      id: 8,
      segment: t('Inactive'),
      customers: 1234,
      engagement: 2.1,
      revenue: 89000,
      riskScore: 'Very High',
      description: 'Low engagement, minimal purchases',
      color: 'bg-error-100 text-error-800',
      riskColor: 'text-error'
    }
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleSegmentSelect = (segmentId) => {
    setSelectedSegments(prev => 
      prev.includes(segmentId) 
        ? prev.filter(id => id !== segmentId)
        : [...prev, segmentId]
    );
  };

  const sortedData = [...segmentationData].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getRiskScoreColor = (riskScore) => {
    switch (riskScore) {
      case 'Low': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'High': return 'text-error';
      case 'Very High': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border card-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{t('Customer Segmentation Analysis')}</h3>
            <p className="text-sm text-text-secondary">{t('Behavioral Clusters & Revenue Contribution')}</p>
          </div>
          <div className="flex items-center space-x-3">
            {selectedSegments.length > 0 && (
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="CheckSquare" size={16} />
                <span>{selectedSegments.length} {t('Selected')} {t('segments')}</span>
              </div>
            )}
            <Button variant="outline" iconName="Download" iconPosition="left">
              {t('Export List')}
            </Button>
            <Button variant="primary" iconName="Plus" iconPosition="left">
              {t('Create Campaign')}
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-50 border-b border-border">
            <tr>
              <th className="text-left p-4">
                <input 
                  type="checkbox" 
                  className="rounded border-border"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSegments(segmentationData.map(s => s.id));
                    } else {
                      setSelectedSegments([]);
                    }
                  }}
                  checked={selectedSegments.length === segmentationData.length}
                />
              </th>
              <th className="text-left p-4">
                <button 
                  onClick={() => handleSort('segment')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>{t('Segment')}</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button 
                  onClick={() => handleSort('customers')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>{t('Customers')}</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button 
                  onClick={() => handleSort('engagement')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>{t('Engagement')}</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button 
                  onClick={() => handleSort('revenue')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>{t('Revenue')}</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button 
                  onClick={() => handleSort('riskScore')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>{t('Risk Score')}</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">{t('Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((segment) => (
              <tr key={segment.id} className="border-b border-border hover:bg-surface-50 transition-colors">
                <td className="p-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-border"
                    checked={selectedSegments.includes(segment.id)}
                    onChange={() => handleSegmentSelect(segment.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${segment.color} w-fit`}>
                      {segment.segment}
                    </span>
                    <span className="text-xs text-text-muted mt-1">{segment.description}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-medium text-text-primary">{segment.customers.toLocaleString()}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-text-primary">{segment.engagement}/10</span>
                    <div className="w-16 h-2 bg-surface-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${(segment.engagement / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-medium text-text-primary">${(segment.revenue / 1000).toFixed(0)}K</span>
                </td>
                <td className="p-4">
                  <span className={`font-medium ${getRiskScoreColor(segment.riskScore)}`}>
                    {t(segment.riskScore)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      {t('View Details')}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerSegmentationTable;