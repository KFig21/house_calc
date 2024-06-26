import React from 'react';
import './inputs.scss';
import CircleButton from '../../buttons/circleButton/circleButton';
import { useAppContext } from '../../../contexts/appContext';

const HomeInsuranceInput: React.FC = () => {
  const { homeInsurance, setHomeInsurance } = useAppContext();

  const handleDecrease = () => {
    setHomeInsurance(Math.max(0, homeInsurance - 50));
  };

  const handleIncrease = () => {
    setHomeInsurance(Math.min(99999, homeInsurance + 50));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 99999) {
      setHomeInsurance(newValue);
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
          type="number"
          value={homeInsurance}
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
