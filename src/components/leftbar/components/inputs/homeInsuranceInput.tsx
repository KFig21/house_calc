import React, { useEffect, useState } from 'react';
import './inputs.scss';
import CircleButton from '../../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../../contexts/appContext';
import {
  formatNumberWithCommas,
  parseCommaSeparatedNumber,
} from '../../../../utils/utils';

const HomeInsuranceInput: React.FC = () => {
  const { homeInsurance, setHomeInsurance } = useAppContext();
  const [displayValue, setDisplayValue] = useState<string>(
    formatNumberWithCommas(homeInsurance)
  );

  useEffect(() => {
    setDisplayValue(formatNumberWithCommas(homeInsurance));
  }, [homeInsurance]);

  const handleDecrease = () => {
    const newValue = Math.max(0, homeInsurance - 50);
    setHomeInsurance(newValue);
    setDisplayValue(formatNumberWithCommas(newValue));
  };

  const handleIncrease = () => {
    const newValue = Math.min(99999, homeInsurance + 50);
    setHomeInsurance(newValue);
    setDisplayValue(formatNumberWithCommas(newValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseCommaSeparatedNumber(e.target.value);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 99999) {
      setHomeInsurance(numericValue);
      setDisplayValue(formatNumberWithCommas(numericValue));
    }
  };

  return (
    <div className="horizontal-input">
      <label>Homeowners Ins.</label>
      <div className="input-container">
        <CircleButton
          onClick={homeInsurance > 0 ? handleDecrease : undefined}
          disabled={homeInsurance <= 0}
          text="-"
        />
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          min={0}
          max={99999}
        />
        <CircleButton
          onClick={homeInsurance < 99900 ? handleIncrease : undefined}
          disabled={homeInsurance > 99900}
          text="+"
        />
      </div>
    </div>
  );
};

export default HomeInsuranceInput;
