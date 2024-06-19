import React from 'react';
import './circleButton.scss';

interface CircleButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  text: string;
}

const CircleButton: React.FC<CircleButtonProps> = ({
  onClick,
  disabled,
  text,
}) => {
  return (
    <button
      className={`circle-button ${disabled ? 'disabled' : ''}`}
      onClick={!disabled ? onClick : undefined}
    >
      <span className="sign">{text}</span>
    </button>
  );
};

export default CircleButton;
