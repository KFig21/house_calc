import React, { useState, useEffect } from 'react';
import './inputs.scss';
import CircleButton from '../../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../../contexts/appContext';
import {
  formatNumberWithCommas,
  parseCommaSeparatedNumber,
} from '../../../../utils/utils';

const DownPaymentInput: React.FC = () => {
  const { downPayment, setDownPayment } = useAppContext();
  const [displayValue, setDisplayValue] = useState<string>(
    formatNumberWithCommas(downPayment)
  );

  useEffect(() => {
    setDisplayValue(formatNumberWithCommas(downPayment));
  }, [downPayment]);

  const handleDecrease = () => {
    if (downPayment > 1000) {
      const newValue = downPayment - 1000;
      setDownPayment(newValue);
      setDisplayValue(formatNumberWithCommas(newValue));
    }
  };

  const handleIncrease = () => {
    const newValue = downPayment + 1000;
    setDownPayment(newValue);
    setDisplayValue(formatNumberWithCommas(newValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseCommaSeparatedNumber(e.target.value);
    if (!isNaN(numericValue)) {
      setDownPayment(numericValue);
      setDisplayValue(formatNumberWithCommas(numericValue));
    }
  };

  return (
    <div className="horizontal-input">
      <label>Down Payment</label>
      <div className="input-container">
        <CircleButton
          onClick={downPayment > 1000 ? handleDecrease : undefined}
          disabled={downPayment <= 1000}
          text="-"
        />
        <input type="text" value={displayValue} onChange={handleChange} />
        <CircleButton onClick={handleIncrease} disabled={false} text="+" />
      </div>
    </div>
  );
};

export default DownPaymentInput;
