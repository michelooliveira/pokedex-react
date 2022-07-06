import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pokemon } from "interfaces";
import React, { useCallback, useMemo, useState } from "react";
import "./styles.scss";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const pokemonTypeCardColor: { [key: string]: string } = {
  Fire: "#EE7F33",
  Normal: "#A9A778",
  Water: "#6890F0",
  Grass: "#78C84F",
  Ice: "#98D8D7",
  Poison: "#A040A1",
  Ground: "#E0C069",
  Flying: "#A790EF",
  Bug: "#A8B821",
  Rock: "#B6A037",
  Ghost: "#705797",
  Dragon: "#724EF9",
  Dark: "#6F5848",
  Steel: "#B8B8D0",
  Fairy: "#F4C8E2",
  Psychic: "#E95587",
  Electric: "#F8CF32",
  Fighting: "#C03228",
};

const PokemonCard: React.FC<{
  pokemon: Pokemon;
  isFavorite?: boolean;
  onFavoriteClick: (pokemon: Pokemon) => void;
}> = ({ pokemon, isFavorite = true, onFavoriteClick }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleFavoriteClick = useCallback(() => {
    onFavoriteClick(pokemon);
  }, [pokemon, onFavoriteClick]);

  const shouldDisplayFavoriteIcon = useMemo(
    () => isHovering || isFavorite,
    [isHovering, isFavorite]
  );

  return (
    <li
      className="pokemon-card__wrapper"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        role="button"
        onClick={() => handleFavoriteClick()}
        onKeyDown={() => handleFavoriteClick()}
        className="d-flex justify-content-end"
      >
        <div style={{ height: 16 }}>
          {shouldDisplayFavoriteIcon && (
            <FontAwesomeIcon
              icon={isFavorite ? faHeart : regularHeart}
              className="pokemon-card__favorite-button"
            />
          )}
        </div>
      </div>
      <div className="pokemon-card__picture">
        <img
          src={isHovering ? pokemon.sprites.animated : pokemon.sprites.large}
          loading="lazy"
          alt={pokemon.name}
        />
      </div>

      <div className="pokemon-card__info">
        <span>No. {pokemon.national_number}</span>
        <span>{pokemon.name}</span>
      </div>
      <div className="pokemon-card__types">
        {pokemon.type.map((type: string) => (
          <span
            style={{ backgroundColor: pokemonTypeCardColor[type] }}
            key={type}
          >
            {type}
          </span>
        ))}
      </div>
    </li>
  );
};

export default PokemonCard;
