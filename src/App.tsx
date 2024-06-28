import React from 'react';
import './app.scss';
import { AppProvider } from './contexts/appContext';
import Header from './components/header/header';
import Breakdown from './components/content/containers/breakdown/breakdown';
import MonthlyDash from './components/content/containers/monthly/monthlyDash';
import AmortizationSchedule from './components/content/containers/amortization/amortization';
import LeftBarDesktop from './components/leftbar/desktop/leftbar';
import Footer from './components/leftbar/components/footer/footer';
import LeftBarMobile from './components/leftbar/mobile/leftbarMobile';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <LeftBarDesktop />
        <div className="dashboard">
          <div className="upper">
            <MonthlyDash />
            <Breakdown />
          </div>
          <div className="lower">
            <AmortizationSchedule />
          </div>
          <Footer />
        </div>
      </div>
      <LeftBarMobile />
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
