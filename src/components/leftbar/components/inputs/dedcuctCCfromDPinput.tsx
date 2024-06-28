import React from 'react';
import './inputs.scss';
import { useAppContext } from '../../../../contexts/appContext';

const DeductCCfomDPinput: React.FC = () => {
  const { deductCCfromDP, setDeductCCfromDP } = useAppContext();

  return (
    <>
      <div className="horizontal-input">
        <label>Deduct CC from DP?</label>
        <div className="input-container">
          <button
            className={`toggle-button status-switch ${
              deductCCfromDP ? 'active' : ''
            }`}
            onClick={() => setDeductCCfromDP(!deductCCfromDP)}
          >
            <div className="status-span">{deductCCfromDP ? 'Yes' : 'No'}</div>
            <div className="slider"></div>
          </button>
        </div>
      </div>
    </>
  );
};

export default DeductCCfomDPinput;
