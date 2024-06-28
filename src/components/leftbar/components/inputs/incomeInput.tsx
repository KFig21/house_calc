import React, { useState, useEffect } from 'react';
import './inputs.scss';
import CircleButton from '../../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../../contexts/appContext';
import {
  formatNumberWithCommas,
  parseCommaSeparatedNumber,
} from '../../../../utils/utils';

const IncomeInput: React.FC = () => {
  const { annualIncome, setAnnualIncome } = useAppContext();
  const [displayValue, setDisplayValue] = useState<string>(
    formatNumberWithCommas(annualIncome)
  );

  useEffect(() => {
    setDisplayValue(formatNumberWithCommas(annualIncome));
  }, [annualIncome]);

  const handleDecrease = () => {
    if (annualIncome > 1000) {
      const newValue = annualIncome - 1000;
      setAnnualIncome(newValue);
      setDisplayValue(formatNumberWithCommas(newValue));
    }
  };

  const handleIncrease = () => {
    const newValue = annualIncome + 1000;
    setAnnualIncome(newValue);
    setDisplayValue(formatNumberWithCommas(newValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseCommaSeparatedNumber(e.target.value);
    if (!isNaN(numericValue)) {
      setAnnualIncome(numericValue);
      setDisplayValue(formatNumberWithCommas(numericValue));
    }
  };

  return (
    <div className="horizontal-input">
      <label>Annual Income</label>
      <div className="input-container">
        <CircleButton
          onClick={annualIncome > 1000 ? handleDecrease : undefined}
          disabled={annualIncome <= 1000}
          text="-"
        />
        <input type="text" value={displayValue} onChange={handleChange} />
        <CircleButton onClick={handleIncrease} disabled={false} text="+" />
      </div>
    </div>
  );
};

export default IncomeInput;
