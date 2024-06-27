import React, { useState, useEffect } from 'react';
import './inputs.scss';
import CircleButton from '../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../contexts/appContext';
import {
  formatNumberWithCommas,
  parseCommaSeparatedNumber,
} from '../../../utils/utils';

const MonthlyDebtsInput: React.FC = () => {
  const { monthlyDebts, setMonthlyDebts } = useAppContext();
  const [displayValue, setDisplayValue] = useState<string>(
    formatNumberWithCommas(monthlyDebts)
  );

  useEffect(() => {
    setDisplayValue(formatNumberWithCommas(monthlyDebts));
  }, [monthlyDebts]);

  const handleDecrease = () => {
    const newValue = Math.max(0, monthlyDebts - 100);
    setMonthlyDebts(newValue);
    setDisplayValue(formatNumberWithCommas(newValue));
  };

  const handleIncrease = () => {
    const newValue = Math.min(99999, monthlyDebts + 100);
    setMonthlyDebts(newValue);
    setDisplayValue(formatNumberWithCommas(newValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseCommaSeparatedNumber(e.target.value);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 99999) {
      setMonthlyDebts(numericValue);
      setDisplayValue(formatNumberWithCommas(numericValue));
    }
  };

  return (
    <div className="horizontal-input">
      <label>Monthly Debts</label>
      <div className="input-container">
        <CircleButton
          onClick={monthlyDebts > 0 ? handleDecrease : undefined}
          disabled={monthlyDebts <= 0}
          text="-"
        />
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          min={0}
          max={99999}
        />
        <CircleButton onClick={handleIncrease} disabled={false} text="+" />
      </div>
    </div>
  );
};

export default MonthlyDebtsInput;
