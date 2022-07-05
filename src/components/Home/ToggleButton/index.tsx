import React from "react";
import "./styles.scss";

const ToggleButton: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...inputProps
}) => {
  return (
    <div className="toggle-button__wrapper">
      <input {...inputProps} type="checkbox" id="switch" />
      <label htmlFor="switch">Toggle</label>
    </div>
  );
};

export default ToggleButton;
