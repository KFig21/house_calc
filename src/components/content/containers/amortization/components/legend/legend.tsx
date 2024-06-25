import React from 'react';
import './legend.scss';

const LegendRender: React.FC = (props: any) => {
  console.log('props', props);

  const RectPath = () => <path stroke="none" d="M0,4h32v24h-32z"></path>;

  const LinePath = () => (
    <path
      stroke-width="4"
      d="M0,16h10.666666666666666
        A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
        H32M21.333333333333332,16
        A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
    ></path>
  );

  return (
    <div className="legend">
      {props.payload.map((el: any) => {
        return (
          <div className={`legend-item  ${el['dataKey']}`}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 32 32"
              className="legend-svg"
            >
              {el['type'] === 'rect' && <RectPath />}
              {el['type'] === 'line' && <LinePath />}
            </svg>
            <span className="item-name">{el['dataKey']}</span>
          </div>
        );
      })}
    </div>
  );
};

export default LegendRender;
