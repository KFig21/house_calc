import React from 'react';
import './../../amortization.scss';

const YearsAxis: React.FC = ({ ...args }: any) => {
  const { x, y, payload } = args;

  if (payload.value % 5 === 0) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle">
          {payload.value}
        </text>
      </g>
    );
  } else {
    return null;
  }
};

export default YearsAxis;
