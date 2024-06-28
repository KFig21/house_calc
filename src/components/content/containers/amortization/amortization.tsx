import React from 'react';
import { useAppContext } from '../../../../contexts/appContext';
import './amortization.scss';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  // Legend,
  ResponsiveContainer,
  Line,
} from 'recharts';
import CustomTooltip from './components/tooltip/tooltip';
import PaymentsAxis from './components/axis/paymentsAxis';
import BalanceAxis from './components/axis/balanceAxis';
import YearsAxis from './components/axis/yearsAxis';
// import LegendRender from './components/legend/legend';
import HeaderLegend from './components/legend/headerLegend';
import AmortizationModal from './components/modal/amortizationModal';

const AmortizationSchedule: React.FC = () => {
  const { amortizationSchedule } = useAppContext();

  return (
    <div className="am-container">
      {/* desktop header */}
      <div className="am-header desktop">
        <div className="yAxisTitle left">Payments</div>
        <div className="title">
          <span>Mortgage Payment Info</span>
          <AmortizationModal />
        </div>
        <HeaderLegend type="desktop" />
        <div className="yAxisTitle right">Balance</div>
      </div>
      {/* mobile header */}
      <div className="am-header mobile">
        <div className="title">
          <span>Mortgage Payment Info</span>
          <AmortizationModal />
        </div>
      </div>
      {/* table */}
      <div className="table-wrapper">
        <div className="table-container">
          <div className="axis mobile">
            <div className="yAxisTitle left">Payments</div>
            <div className="yAxisTitle right">Balance</div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={amortizationSchedule.data}
              margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
            >
              <XAxis dataKey="year" stroke="#d1d1d1" tick={<YearsAxis />} />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#d1d1d1"
                tick={<PaymentsAxis />}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#d1d1d1"
                tick={<BalanceAxis />}
              />
              <Tooltip content={<CustomTooltip />} />
              {/* <Legend content={<LegendRender />} /> */}
              <Bar
                dataKey="principal"
                stackId="a"
                yAxisId="left"
                className="principal"
              />
              <Bar
                dataKey="interest"
                stackId="a"
                yAxisId="left"
                className="interest"
              />
              <Bar dataKey="fees" stackId="a" yAxisId="left" className="fees" />
              <Line
                type="linear"
                dataKey="balance"
                activeDot={{ r: 8, className: 'active-dot' }}
                hide={false}
                yAxisId="right"
                className="balance"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      <HeaderLegend type="mobile" />
    </div>
  );
};

export default AmortizationSchedule;
