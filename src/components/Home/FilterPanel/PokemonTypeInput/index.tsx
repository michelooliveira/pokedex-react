import React from "react";
import "./styles.scss";

interface PokemonTypeInput extends React.InputHTMLAttributes<HTMLInputElement> {
  pokemonType: string;
}

const PokemonTypeInput: React.FC<PokemonTypeInput> = ({
  pokemonType,
  ...rest
}) => {
  return (
    <div className="pokemon-type-input__wrapper">
      <input
        className="pokemon-type-input__input"
        id={`pokemon-type-${pokemonType}`}
        type="checkbox"
        value={pokemonType}
        {...rest}
      />
      <label
        className="pokemon-type-input__label"
        htmlFor={`pokemon-type-${pokemonType}`}
      >
        {pokemonType}
      </label>
    </div>
  );
};

export default PokemonTypeInput;
