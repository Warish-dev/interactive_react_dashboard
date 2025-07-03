import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IncidentTable = ({ onIncidentSelect }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [incidents, setIncidents] = useState([]);
  const [sortBy, setSortBy] = useState('duration');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');

  const translations = {
    en: {
      'Active Incidents': 'Active Incidents',
      'All': 'All',
      'Open': 'Open',
      'In Progress': 'In Progress',
      'Resolved': 'Resolved',
      'Incident ID': 'Incident ID',
      'Status': 'Status',
      'Affected Service': 'Affected Service',
      'Duration': 'Duration',
      'Assigned Owner': 'Assigned Owner',
      'Actions': 'Actions',
      'View Details': 'View Details',
      'Assign': 'Assign',
      'Update': 'Update',
      'minutes': 'minutes',
      'hours': 'hours',
      'days': 'days'
    },
    es: {
      'Active Incidents': 'Incidentes Activos',
      'All': 'Todos',
      'Open': 'Abierto',
      'In Progress': 'En Progreso',
      'Resolved': 'Resuelto',
      'Incident ID': 'ID de Incidente',
      'Status': 'Estado',
      'Affected Service': 'Servicio Afectado',
      'Duration': 'Duración',
      'Assigned Owner': 'Propietario Asignado',
      'Actions': 'Acciones',
      'View Details': 'Ver Detalles',
      'Assign': 'Asignar',
      'Update': 'Actualizar',
      'minutes': 'minutos',
      'hours': 'horas',
      'days': 'días'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = (key) => translations[currentLanguage][key] || key;

  const mockIncidents = [
    {
      id: 'INC-2024-001',
      status: 'open',
      severity: 'critical',
      title: 'Database Connection Pool Exhausted',
      affectedService: 'PostgreSQL Primary',
      startTime: new Date(Date.now() - 1800000), // 30 minutes ago
      assignedOwner: 'Sarah Chen',
      ownerAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      description: 'Primary database connection pool has reached maximum capacity'
    },
    {
      id: 'INC-2024-002',
      status: 'in-progress',
      severity: 'warning',
      title: 'High Memory Usage on Web Servers',
      affectedService: 'Web Server Cluster',
      startTime: new Date(Date.now() - 3600000), // 1 hour ago
      assignedOwner: 'Mike Rodriguez',
      ownerAvatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      description: 'Memory usage exceeding 85% threshold on multiple web servers'
    },
    {
      id: 'INC-2024-003',
      status: 'open',
      severity: 'critical',
      title: 'API Gateway Response Time Degradation',
      affectedService: 'API Gateway',
      startTime: new Date(Date.now() - 900000), // 15 minutes ago
      assignedOwner: 'Alex Thompson',
      ownerAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      description: 'API response times exceeding SLA thresholds'
    },
    {
      id: 'INC-2024-004',
      status: 'in-progress',
      severity: 'warning',
      title: 'Load Balancer Health Check Failures',
      affectedService: 'Load Balancer',
      startTime: new Date(Date.now() - 7200000), // 2 hours ago
      assignedOwner: 'Emma Wilson',
      ownerAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      description: 'Multiple backend servers failing health checks'
    },
    {
      id: 'INC-2024-005',
      status: 'resolved',
      severity: 'info',
      title: 'Scheduled Maintenance Completed',
      affectedService: 'Redis Cluster',
      startTime: new Date(Date.now() - 10800000), // 3 hours ago
      assignedOwner: 'David Kim',
      ownerAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      description: 'Routine maintenance window completed successfully'
    }
  ];

  useEffect(() => {
    setIncidents(mockIncidents);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-error bg-error-50 border-error/20';
      case 'in-progress': return 'text-warning bg-warning-50 border-warning/20';
      case 'resolved': return 'text-success bg-success-50 border-success/20';
      default: return 'text-text-secondary bg-surface-50 border-border';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const formatDuration = (startTime) => {
    const now = new Date();
    const diff = now - startTime;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 60) return `${minutes} ${t('minutes')}`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ${t('hours')}`;
    const days = Math.floor(hours / 24);
    return `${days} ${t('days')}`;
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleIncidentAction = (incidentId, action) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === incidentId 
        ? { ...incident, status: action === 'resolve' ? 'resolved' : 'in-progress' }
        : incident
    ));
  };

  const filteredIncidents = incidents.filter(incident => 
    filterStatus === 'all' || incident.status === filterStatus
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'duration':
        aValue = new Date() - a.startTime;
        bValue = new Date() - b.startTime;
        break;
      case 'severity':
        const severityOrder = { critical: 3, warning: 2, info: 1 };
        aValue = severityOrder[a.severity] || 0;
        bValue = severityOrder[b.severity] || 0;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      default:
        aValue = a[sortBy];
        bValue = b[sortBy];
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">{t('Active Incidents')}</h3>
          <div className="flex space-x-2">
            {['all', 'open', 'in-progress', 'resolved'].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'primary' : 'ghost'}
                size="xs"
                onClick={() => setFilterStatus(status)}
              >
                {t(status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>{t('Incident ID')}</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>{t('Status')}</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-text-secondary">{t('Affected Service')}</span>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('duration')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>{t('Duration')}</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-text-secondary">{t('Assigned Owner')}</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-text-secondary">{t('Actions')}</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedIncidents.map((incident) => (
              <tr key={incident.id} className="hover:bg-surface-50 transition-smooth">
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getSeverityIcon(incident.severity)} 
                      size={16} 
                      className={getSeverityColor(incident.severity)}
                    />
                    <span className="text-sm font-medium text-text-primary">
                      {incident.id}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(incident.status)}`}>
                    {t(incident.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-primary">
                      {incident.affectedService}
                    </span>
                    <span className="text-xs text-text-muted">
                      {incident.title}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-secondary">
                    {formatDuration(incident.startTime)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <img
                      src={incident.ownerAvatar}
                      alt={incident.assignedOwner}
                      className="w-6 h-6 rounded-full"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                    <span className="text-sm text-text-primary">
                      {incident.assignedOwner}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onIncidentSelect?.(incident)}
                      iconName="Eye"
                      iconSize={12}
                    >
                      {t('View Details')}
                    </Button>
                    {incident.status !== 'resolved' && (
                      <>
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleIncidentAction(incident.id, 'assign')}
                          iconName="UserPlus"
                          iconSize={12}
                        >
                          {t('Assign')}
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleIncidentAction(incident.id, 'update')}
                          iconName="Edit"
                          iconSize={12}
                        >
                          {t('Update')}
                        </Button>
                      </>
                    )}
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

export default IncidentTable;