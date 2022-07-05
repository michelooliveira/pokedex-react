import React from "react";
import "./styles.scss";

interface SortToggleProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
}

const SortToggle: React.FC<SortToggleProps> = ({ options, ...rest }) => {
  return (
    <div className="sort-toggle__wrapper">
      <span className="sort-toggle__label">Ordenar por</span>
      <div>
        <select className="sort-toggle__input" name="sort-order" {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortToggle;
