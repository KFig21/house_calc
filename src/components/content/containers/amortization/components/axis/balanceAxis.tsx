import React from 'react';
import './../../amortization.scss';
import { formatToWholeDollarAmount } from '../../../../../../utils/utils';

const BalanceAxis: React.FC = ({ ...args }: any) => {
  const { x, y, stroke, payload } = args;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={80} y={0} dy={16} textAnchor="end">
        {formatToWholeDollarAmount(payload.value)}
      </text>
    </g>
  );
};

export default BalanceAxis;
