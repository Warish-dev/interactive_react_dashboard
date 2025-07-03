import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import ExecutiveOverviewDashboard from "pages/executive-overview-dashboard";
import CustomerAnalyticsHub from "pages/customer-analytics-hub";
import SalesAnalyticsDashboard from "pages/sales-analytics-dashboard";
import OperationsCommandCenter from "pages/operations-command-center";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<ExecutiveOverviewDashboard />} />
        <Route path="/executive-overview-dashboard" element={<ExecutiveOverviewDashboard />} />
        <Route path="/customer-analytics-hub" element={<CustomerAnalyticsHub />} />
        <Route path="/sales-analytics-dashboard" element={<SalesAnalyticsDashboard />} />
        <Route path="/operations-command-center" element={<OperationsCommandCenter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;