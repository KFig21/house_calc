import { useState, useEffect } from 'react';
import { useAppContext } from '../../../../../../contexts/appContext';
import { formatToWholeDollarAmount } from '../../../../../../utils/utils';
import './dtiSlider.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const DtiInput: React.FC = () => {
  const { dtiPercentage, setDtiPercentage, monthlyBreakdown, calcType } =
    useAppContext();
  const [sliderValue, setSliderValue] = useState(dtiPercentage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDtiPercentage(parseFloat(e.toString()));
  };

  useEffect(() => {
    if (!calcType) {
      setSliderValue(dtiPercentage);
    }
  }, [dtiPercentage]);

  return (
    <div className="dti-container">
      <div className="monthly-payment">
        <span className="key">Monthly Payment:</span>
        <span className="amount">
          {formatToWholeDollarAmount(monthlyBreakdown?.finances.housing)}
        </span>
      </div>
      <div className="input-container">
        <Slider
          min={10}
          max={50}
          step={1}
          defaultValue={!calcType ? sliderValue : dtiPercentage}
          value={!calcType ? sliderValue : dtiPercentage}
          onChange={(e: any) => handleChange(e)}
          disabled={!calcType}
          className={`dtiSlider
            ${dtiPercentage < 37 && 'green'}
            ${dtiPercentage > 36 && dtiPercentage < 44 && 'yellow'}
            ${dtiPercentage > 43 && 'red'}
          `}
        />
      </div>
      <div className="below-input">
        <label
          className={`
          dti-label 
          ${dtiPercentage < 37 && 'green'}
          ${dtiPercentage > 36 && dtiPercentage < 44 && 'yellow'}
          ${dtiPercentage > 43 && 'red'}
          `}
        >
          Debt/Income ({Math.round(dtiPercentage)}%)
        </label>
        <span className="explanation">(housing + debt) / Monthly Income</span>
      </div>
    </div>
  );
};

export default DtiInput;
