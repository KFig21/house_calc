import React from 'react';
import './tooltip.scss';
import { formatToWholeDollarAmount } from '../../../../../../utils/utils';

const CustomTooltip: React.FC = ({ payload, label, active }: any) => {
  if (active) {
    return (
      <div className="tooltip">
        <div className="tooltip-header">Year {payload[0].payload.year}</div>
        <div className="tooltip-data-container">
          <div className="tooltip-data-element">
            <span className={`tooltip-el-key fees`}>Taxes & Fees:</span>
            <span>{formatToWholeDollarAmount(payload[2].value)}</span>
          </div>
          <div className="tooltip-data-element">
            <span className={`tooltip-el-key interest`}>Interest:</span>
            <span>{formatToWholeDollarAmount(payload[1].value)}</span>
          </div>
          <div className="tooltip-data-element">
            <span className={`tooltip-el-key principal`}>Principal:</span>
            <span>{formatToWholeDollarAmount(payload[0].value)}</span>
          </div>
          <div className="tooltip-data-element">
            <span className={`tooltip-el-key balance`}>Balance:</span>
            <span>{formatToWholeDollarAmount(payload[3].value)}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
