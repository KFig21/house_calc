import React from 'react';
import './inputs.scss';
import { useAppContext } from '../../../contexts/appContext';

const DeductCCfomDPinput: React.FC = () => {
  const { deductCCfromDP, setDeductCCfromDP } = useAppContext();

  return (
    <div className="horizontal-input">
      <label>Deduct CC from DP?</label>
      <div className="input-container">
        <input
          type="checkbox"
          checked={deductCCfromDP}
          onChange={() => setDeductCCfromDP(!deductCCfromDP)}
        />
      </div>
    </div>
  );
};

export default DeductCCfomDPinput;
