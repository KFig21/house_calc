import React from 'react';
import { useAppContext } from '../../../../contexts/appContext';
import './breakdown.scss';
import { formatToWholeDollarAmount } from '../../../../utils/utils';
import HouseBreakdown from './components/houseBreakdown';
import FeesBreakdown from './components/feesBreakdown';
import TotalBreakdown from './components/totalBreakdown';

const Breakdown: React.FC = () => {
  const { results } = useAppContext();

  return (
    <div className="breakdown-container">
      <div className="title">
        <span className="key">House price:</span>
        <span className="amount">
          {formatToWholeDollarAmount(results.housePrice)}
        </span>
      </div>
      <div className="breakdown">
        <div className="breakdown-left">
          <HouseBreakdown />
          <FeesBreakdown />
        </div>
        <div className="breakdown-right">
          <TotalBreakdown />
        </div>
      </div>
    </div>
  );
};

export default Breakdown;
