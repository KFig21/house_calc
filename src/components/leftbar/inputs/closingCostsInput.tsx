import React from 'react';
import './inputs.scss';
import CircleButton from '../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../contexts/appContext';

const ClosingCostsInput: React.FC = () => {
  const { closingCosts, setClosingCosts } = useAppContext();

  const handleDecrease = () => {
    setClosingCosts(Math.max(0, parseFloat((closingCosts - 0.1).toFixed(1))));
  };

  const handleIncrease = () => {
    setClosingCosts(parseFloat((closingCosts + 0.1).toFixed(1)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setClosingCosts(newValue);
    }
  };

  return (
    <div className="horizontal-input">
      <label>Closing Costs (%)</label>
      <div className="input-container">
        <CircleButton
          onClick={closingCosts > 0 ? handleDecrease : undefined}
          disabled={closingCosts <= 0}
          text="-"
        />
        <input
          type="number"
          step="0.1"
          value={closingCosts}
          onChange={handleChange}
          min={0}
        />
        <CircleButton onClick={handleIncrease} disabled={false} text="+" />
      </div>
    </div>
  );
};

export default ClosingCostsInput;
