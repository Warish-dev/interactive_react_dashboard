import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const FilterPanel = ({ onFiltersChange, isCollapsed, onToggleCollapse }) => {
  const [filters, setFilters] = useState({
    dateRange: 'last-30-days',
    teams: [],
    regions: [],
    products: [],
    comparisonMode: 'period-over-period'
  });

  const dateRangeOptions = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const teamOptions = ['North America', 'Europe', 'Asia Pacific', 'Latin America'];
  const regionOptions = ['West', 'East', 'Central', 'South'];
  const productOptions = ['Enterprise', 'Professional', 'Starter', 'Premium'];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleMultiSelectChange = (key, option) => {
    const currentValues = filters[key];
    const newValues = currentValues.includes(option)
      ? currentValues.filter(item => item !== option)
      : [...currentValues, option];
    
    handleFilterChange(key, newValues);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateRange: 'last-30-days',
      teams: [],
      regions: [],
      products: [],
      comparisonMode: 'period-over-period'
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  if (isCollapsed) {
    return (
      <div className="bg-surface border border-border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} color="var(--color-text-secondary)" />
            <span className="text-sm font-medium text-text-secondary">Filters Applied</span>
            <div className="flex items-center space-x-1">
              {Object.values(filters).flat().filter(Boolean).length > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {Object.values(filters).flat().filter(Boolean).length}
                </span>
              )}
            </div>
          </div>
          <Button variant="ghost" onClick={onToggleCollapse}>
            <Icon name="ChevronDown" size={16} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} color="var(--color-text-secondary)" />
          <h3 className="text-lg font-semibold text-text-primary">Advanced Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="text" onClick={clearAllFilters} className="text-sm">
            Clear All
          </Button>
          <Button variant="ghost" onClick={onToggleCollapse}>
            <Icon name="ChevronUp" size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Date Range</label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Teams */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Teams</label>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {teamOptions.map(team => (
              <label key={team} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.teams.includes(team)}
                  onChange={() => handleMultiSelectChange('teams', team)}
                  className="rounded border-border text-primary focus:ring-primary/20"
                />
                <span className="text-text-primary">{team}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Regions</label>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {regionOptions.map(region => (
              <label key={region} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.regions.includes(region)}
                  onChange={() => handleMultiSelectChange('regions', region)}
                  className="rounded border-border text-primary focus:ring-primary/20"
                />
                <span className="text-text-primary">{region}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Products</label>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {productOptions.map(product => (
              <label key={product} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.products.includes(product)}
                  onChange={() => handleMultiSelectChange('products', product)}
                  className="rounded border-border text-primary focus:ring-primary/20"
                />
                <span className="text-text-primary">{product}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Mode */}
      <div className="mt-4 pt-4 border-t border-border">
        <label className="text-sm font-medium text-text-secondary mb-2 block">Comparison Mode</label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="comparisonMode"
              value="period-over-period"
              checked={filters.comparisonMode === 'period-over-period'}
              onChange={(e) => handleFilterChange('comparisonMode', e.target.value)}
              className="text-primary focus:ring-primary/20"
            />
            <span className="text-sm text-text-primary">Period over Period</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="comparisonMode"
              value="year-over-year"
              checked={filters.comparisonMode === 'year-over-year'}
              onChange={(e) => handleFilterChange('comparisonMode', e.target.value)}
              className="text-primary focus:ring-primary/20"
            />
            <span className="text-sm text-text-primary">Year over Year</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;