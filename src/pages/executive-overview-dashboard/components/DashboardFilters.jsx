import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DashboardFilters = ({ onFiltersChange }) => {
  const [selectedDateRange, setSelectedDateRange] = useState('Q4 2024');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [comparisonEnabled, setComparisonEnabled] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const dateRanges = [
    'Q4 2024',
    'Q3 2024',
    'Q2 2024',
    'Q1 2024',
    'FY 2024',
    'Last 30 Days',
    'Last 90 Days',
    'YTD 2024',
    'Custom Range'
  ];

  const departments = [
    'All Departments',
    'Sales',
    'Marketing',
    'Operations',
    'Customer Success',
    'Finance',
    'Human Resources',
    'IT',
    'Strategy'
  ];

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
    onFiltersChange?.({
      dateRange: range,
      department: selectedDepartment,
      comparison: comparisonEnabled
    });
  };

  const handleDepartmentChange = (dept) => {
    setSelectedDepartment(dept);
    onFiltersChange?.({
      dateRange: selectedDateRange,
      department: dept,
      comparison: comparisonEnabled
    });
  };

  const handleComparisonToggle = () => {
    const newComparison = !comparisonEnabled;
    setComparisonEnabled(newComparison);
    onFiltersChange?.({
      dateRange: selectedDateRange,
      department: selectedDepartment,
      comparison: newComparison
    });
  };

  const handleRefresh = () => {
    // Simulate data refresh
    console.log('Refreshing dashboard data...');
  };

  const handleExport = () => {
    // Simulate export functionality
    console.log('Exporting dashboard data...');
  };

  return (
    <div className="bg-surface border-b border-border p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Date Range Selector */}
          <div className="relative">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-surface-50 border border-border rounded-lg hover:bg-surface-100 transition-smooth"
            >
              <Icon name="Calendar" size={16} color="var(--color-text-secondary)" />
              <span className="text-sm font-medium text-text-primary">{selectedDateRange}</span>
              <Icon name="ChevronDown" size={16} color="var(--color-text-secondary)" />
            </button>

            {isFiltersOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-text-secondary mb-2">Date Range</h4>
                    <div className="space-y-1">
                      {dateRanges.map((range) => (
                        <button
                          key={range}
                          onClick={() => {
                            handleDateRangeChange(range);
                            setIsFiltersOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-smooth ${
                            selectedDateRange === range
                              ? 'bg-primary-50 text-primary font-medium' :'text-text-secondary hover:bg-surface-50 hover:text-text-primary'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Department Filter */}
          <div className="relative">
            <select
              value={selectedDepartment}
              onChange={(e) => handleDepartmentChange(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 bg-surface-50 border border-border rounded-lg text-sm font-medium text-text-primary hover:bg-surface-100 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={16} 
              color="var(--color-text-secondary)"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>

          {/* Comparison Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleComparisonToggle}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-smooth ${
                comparisonEnabled
                  ? 'bg-primary-50 border-primary/20 text-primary' :'bg-surface-50 border-border text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="BarChart2" size={16} />
              <span className="text-sm font-medium">Compare</span>
            </button>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* Last Updated */}
          <div className="hidden sm:flex items-center space-x-2 text-text-muted">
            <Icon name="Clock" size={14} />
            <span className="text-xs">Updated 5 min ago</span>
          </div>

          {/* Refresh Button */}
          <Button
            variant="ghost"
            onClick={handleRefresh}
            className="p-2"
            title="Refresh Data"
          >
            <Icon name="RefreshCw" size={16} />
          </Button>

          {/* Export Button */}
          <Button
            variant="outline"
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
            className="text-sm"
          >
            Export
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            className="p-2"
            title="Dashboard Settings"
          >
            <Icon name="Settings" size={16} />
          </Button>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {isFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsFiltersOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border rounded-t-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Filter Options</h3>
              <Button
                variant="ghost"
                onClick={() => setIsFiltersOpen(false)}
                className="p-2"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-text-secondary mb-2">Date Range</h4>
                <div className="grid grid-cols-2 gap-2">
                  {dateRanges.slice(0, 8).map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        handleDateRangeChange(range);
                        setIsFiltersOpen(false);
                      }}
                      className={`px-3 py-2 text-sm rounded-md border transition-smooth ${
                        selectedDateRange === range
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-surface border-border text-text-secondary hover:bg-surface-50'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardFilters;