import { ReactSVG } from "react-svg";
import "./styles.scss";
import Pokedex from "assets/svg/pokeball.svg";
import SynviaIcon from "assets/svg/synvia-icon.svg";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar__container">
      <div className="navbar__content w-75">
        <div className="navbar__logo">
          <ReactSVG src={Pokedex} />
          <span>Pokédex</span>
        </div>
        <div className="d-flex align-items-center gap-4">
          <ReactSVG src={SynviaIcon} />
          <FontAwesomeIcon icon={faSignOut} size="2x" color="white" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
