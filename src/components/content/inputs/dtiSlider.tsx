import { useAppContext } from '../../../contexts/appContext';
import { formatToWholeDollarAmount } from '../../../utils/utils';
import './dtiSlider.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const DtiInput: React.FC = () => {
  const { dtiPercentage, setDtiPercentage, monthlyBreakdown } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDtiPercentage(parseFloat(e.toString()));
  };

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
          defaultValue={dtiPercentage}
          onChange={(e: any) => handleChange(e)}
          disabled={false}
          className="dtiSlider"
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
          Debt/Income ({dtiPercentage}%)
        </label>
        <span className="explanation">(housing + debt) / Monthly Income</span>
      </div>
    </div>
  );
};

export default DtiInput;
