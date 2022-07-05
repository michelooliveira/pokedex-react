import { ReactSVG } from "react-svg";
import "./styles.scss";
import Pokedex from "assets/svg/pokeball.svg";
import SynviaIcon from "assets/svg/synvia-icon.svg";
import SignOut from "assets/svg/sign-out.svg";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar__container">
      <div className="navbar__content w-75">
        <div className="navbar__logo">
          <ReactSVG src={Pokedex} />
          <span>Pokédex</span>
        </div>
        <div className="d-flex">
          <ReactSVG src={SynviaIcon} />
          <ReactSVG src={SignOut} />
          {/* <FontAwesomeIcon icon="fa-thin fa-right-from-bracket" /> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
