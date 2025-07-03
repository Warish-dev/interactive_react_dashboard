import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isConnected, setIsConnected] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Executive Overview',
      path: '/executive-overview-dashboard',
      icon: 'BarChart3',
      tooltip: 'Strategic performance monitoring for senior leadership'
    },
    {
      label: 'Operations',
      path: '/operations-command-center',
      icon: 'Activity',
      tooltip: 'Real-time system monitoring and incident management'
    },
    {
      label: 'Sales Analytics',
      path: '/sales-analytics-dashboard',
      icon: 'TrendingUp',
      tooltip: 'Comprehensive sales performance tracking and pipeline analysis'
    },
    {
      label: 'Customer Analytics',
      path: '/customer-analytics-hub',
      icon: 'Users',
      tooltip: 'Customer behavior insights and retention analysis'
    }
  ];

  const translations = {
    en: {
      'Executive Overview': 'Executive Overview',
      'Operations': 'Operations',
      'Sales Analytics': 'Sales Analytics',
      'Customer Analytics': 'Customer Analytics',
      'Connected': 'Connected',
      'Disconnected': 'Disconnected',
      'Menu': 'Menu'
    },
    es: {
      'Executive Overview': 'Resumen Ejecutivo',
      'Operations': 'Operaciones',
      'Sales Analytics': 'Análisis de Ventas',
      'Customer Analytics': 'Análisis de Clientes',
      'Connected': 'Conectado',
      'Disconnected': 'Desconectado',
      'Menu': 'Menú'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const checkConnection = () => {
      setIsConnected(navigator.onLine);
    };

    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);
    
    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key) => translations[currentLanguage][key] || key;

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border h-15">
        <div className="flex items-center justify-between h-full px-4">
          {/* Logo Section */}
          <div className="flex items-center w-52">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-700 rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={20} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-text-primary leading-tight">
                  Interactive
                </span>
                <span className="text-xs text-text-secondary leading-tight">
                  React Dashboard
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`nav-item flex items-center space-x-2 ${
                  isActiveRoute(item.path) ? 'nav-item-active' : ''
                }`}
                title={item.tooltip}
              >
                <Icon name={item.icon} size={16} />
                <span className="hidden lg:inline">{t(item.label)}</span>
                <span className="lg:hidden text-xs">{t(item.label).split(' ')[0]}</span>
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-success animate-pulse-subtle' : 'bg-error'
              }`} />
              <span className="text-xs text-text-secondary">
                {t(isConnected ? 'Connected' : 'Disconnected')}
              </span>
            </div>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              className="text-xs px-2 py-1"
            >
              {currentLanguage.toUpperCase()}
            </Button>

            {/* User Context Indicator */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-surface-50 rounded-md">
              <Icon name="User" size={16} color="var(--color-text-secondary)" />
              <span className="text-sm text-text-secondary">Admin</span>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              className="md:hidden p-2"
              aria-label={t('Menu')}
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={toggleMobileMenu} />
          <div className="fixed top-15 left-0 right-0 bg-surface border-b border-border shadow-lg">
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-smooth ${
                    isActiveRoute(item.path)
                      ? 'bg-primary-50 text-primary border border-primary/20' :'text-text-secondary hover:text-text-primary hover:bg-surface-50'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <div className="flex flex-col">
                    <span className="font-medium">{t(item.label)}</span>
                    <span className="text-xs text-text-muted">{item.tooltip}</span>
                  </div>
                </button>
              ))}
              
              {/* Mobile Connection Status */}
              <div className="flex items-center justify-between p-3 border-t border-border mt-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    isConnected ? 'bg-success animate-pulse-subtle' : 'bg-error'
                  }`} />
                  <span className="text-sm text-text-secondary">
                    {t(isConnected ? 'Connected' : 'Disconnected')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={16} color="var(--color-text-secondary)" />
                  <span className="text-sm text-text-secondary">Admin</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;