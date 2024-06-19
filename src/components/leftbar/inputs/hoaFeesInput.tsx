import React from 'react';
import './inputs.scss';
import CircleButton from '../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../contexts/appContext';

const HoaFeesInput: React.FC = () => {
  const { hoaFees, setHoaFees } = useAppContext();

  const handleDecrease = () => {
    setHoaFees(Math.max(0, hoaFees - 50));
  };

  const handleIncrease = () => {
    setHoaFees(Math.min(99999, hoaFees + 50));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 99999) {
      setHoaFees(newValue);
    }
  };

  return (
    <div className="horizontal-input">
      <label>HOA Fees:</label>
      <div className="input-container">
        <CircleButton
          onClick={hoaFees > 0 ? handleDecrease : undefined}
          disabled={hoaFees <= 0}
          text="-"
        />
        <input
          type="number"
          value={hoaFees}
          onChange={handleChange}
          min={0}
          max={99999}
        />
        <CircleButton
          onClick={hoaFees < 99900 ? handleIncrease : undefined}
          disabled={hoaFees > 99900}
          text="+"
        />
      </div>
    </div>
  );
};

export default HoaFeesInput;
