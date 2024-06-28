import React from 'react';
import './inputs.scss';
import { useAppContext } from '../../../../contexts/appContext';

const CalcTypeInput: React.FC = () => {
  const { calcType, setCalcType } = useAppContext();

  return (
    <>
      <div className="horizontal-input">
        <label>Calculate</label>
        <div className="input-container">
          <button
            className={`toggle-button status-switch ${
              calcType ? 'active' : ''
            }`}
            onClick={() => setCalcType(!calcType)}
          >
            <div className="status-span">
              {calcType ? 'Budget' : 'Mortgage'}
            </div>
            <div className="slider"></div>
          </button>
        </div>
      </div>
    </>
  );
};

export default CalcTypeInput;
