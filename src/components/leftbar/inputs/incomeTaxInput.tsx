import React from 'react';
import './inputs.scss';
import CircleButton from '../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../contexts/appContext';

const IncomeTaxRateInput: React.FC = () => {
  const { incomeTaxRate, setIncomeTaxRate } = useAppContext();

  const handleDecrease = () => {
    setIncomeTaxRate(Math.max(0, incomeTaxRate - 1));
  };

  const handleIncrease = () => {
    setIncomeTaxRate(incomeTaxRate + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setIncomeTaxRate(newValue);
    }
  };

  return (
    <div className="horizontal-input">
      <label>Income Tax Rate (%)</label>
      <div className="input-container">
        <CircleButton
          onClick={incomeTaxRate > 0 ? handleDecrease : undefined}
          disabled={incomeTaxRate <= 0}
          text="-"
        />
        <input
          type="number"
          value={incomeTaxRate}
          onChange={handleChange}
          min={0}
        />
        <CircleButton onClick={handleIncrease} disabled={false} text="+" />
      </div>
    </div>
  );
};

export default IncomeTaxRateInput;
