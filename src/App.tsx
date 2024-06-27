import React from 'react';
import './app.scss';
import { AppProvider } from './contexts/appContext';
import Header from './components/header/header';
import Breakdown from './components/content/containers/result/breakdown';
import MonthlyDash from './components/content/containers/monthly/monthlyDash';
import AmortizationSchedule from './components/content/containers/amortization/amortization';
import LeftBar from './components/leftbar/leftbar';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <LeftBar />
        <div className="dashboard">
          <div className="upper">
            <MonthlyDash />
            <Breakdown />
          </div>
          <div className="lower">
            <AmortizationSchedule />
          </div>
        </div>
      </div>
    </div>
  );
};

const WrappedApp: React.FC = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default WrappedApp;
