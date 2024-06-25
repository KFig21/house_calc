import React from 'react';
import './../../amortization.scss';
import { formatToWholeDollarAmount } from '../../../../../../utils/utils';

const PaymentsAxis: React.FC = ({ ...args }: any) => {
  const { x, y, stroke, payload } = args;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end">
        {formatToWholeDollarAmount(payload.value)}
      </text>
    </g>
  );
};

export default PaymentsAxis;
