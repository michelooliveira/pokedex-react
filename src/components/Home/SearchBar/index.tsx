import { ReactSVG } from "react-svg";
import MagnifierIcon from "assets/svg/magnifier-icon.svg";
import "./styles.scss";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder,
  ...rest
}) => {
  return (
    <div className="search-bar__wrapper">
      <input
        className="search-bar__input"
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
      <ReactSVG className="search-bar__icon" src={MagnifierIcon} />
    </div>
  );
};

export default SearchBar;
