import { useAppContext } from '../../../contexts/appContext';
import './dtiSlider.scss';

const DtiInput: React.FC = () => {
  const { dtiPercentage, setDtiPercentage } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDtiPercentage(parseFloat(e.target.value));
  };

  return (
    <div className="horizontal-input">
      <label>Debt/Income (%)</label>
      <div className="input-container">
        <input
          type="range"
          min="10"
          max="60"
          step="1"
          value={dtiPercentage}
          onChange={handleChange}
          className="dtiSlider"
        />
        <input
          type="number"
          value={dtiPercentage}
          onChange={handleChange}
          className="dtiSlider-input"
        />
      </div>
    </div>
  );
};

export default DtiInput;
