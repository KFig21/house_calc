import React from 'react';
import './inputs.scss';
import CircleButton from '../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../contexts/appContext';

const DownPaymentInput: React.FC = () => {
  const { downPayment, setDownPayment } = useAppContext();

  const handleDecrease = () => {
    if (downPayment > 1000) {
      setDownPayment(downPayment - 1000);
    }
  };

  const handleIncrease = () => {
    setDownPayment(downPayment + 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setDownPayment(newValue);
    }
  };

  return (
    <div className="horizontal-input">
      <label>Down Payment:</label>
      <div className="input-container">
        <CircleButton
          onClick={downPayment > 1000 ? handleDecrease : undefined}
          disabled={downPayment <= 1000}
          text="-"
        />
        <input type="number" value={downPayment} onChange={handleChange} />
        <CircleButton onClick={handleIncrease} disabled={false} text="+" />
      </div>
    </div>
  );
};

export default DownPaymentInput;
