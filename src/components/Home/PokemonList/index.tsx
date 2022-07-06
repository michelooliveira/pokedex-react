import { Pokemon } from "interfaces";
import React, { useCallback } from "react";
import PokemonCard from "../PokemonCard";
import "./styles.scss";

const PokemonList: React.FC<{
  favoritePokemons: Pokemon[];
  pokemonList: Pokemon[];
  onFavoriteClick: (pokemon: Pokemon) => void;
}> = ({ pokemonList, onFavoriteClick, favoritePokemons }) => {
  const isFavorite = useCallback(
    (pokemonNationalNumber: string): boolean =>
      favoritePokemons.some(
        (chosenPokemon) =>
          chosenPokemon.national_number === pokemonNationalNumber
      ),
    [favoritePokemons, pokemonList]
  );
  return (
    <ul className="pokemon-list__wrapper">
      {pokemonList.map((pokemon) => (
        <PokemonCard
          onFavoriteClick={onFavoriteClick}
          key={pokemon.national_number}
          pokemon={pokemon}
          isFavorite={isFavorite(pokemon.national_number)}
        />
      ))}
    </ul>
  );
};

export default PokemonList;
