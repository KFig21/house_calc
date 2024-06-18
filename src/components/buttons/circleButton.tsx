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
    <div
      className={`circle-button ${disabled ? 'disabled' : ''}`}
      onClick={!disabled ? onClick : undefined}
    >
      <span className="sign">{text}</span>
    </div>
  );
};

export default CircleButton;
