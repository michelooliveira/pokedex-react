import { Pokemon } from "interfaces";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import PokemonCard from "./index";
import { cleanup, fireEvent, render } from "@testing-library/react";

const pokeMock: Pokemon = {
  national_number: "001",
  evolution: null,
  sprites: {
    normal:
      "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/bulbasaur.png",
    large: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
    animated:
      "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif",
  },
  name: "Bulbasaur",
  type: ["Grass", "Poison"],
  total: 318,
  hp: 45,
  attack: 49,
  defense: 49,
  sp_atk: 65,
  sp_def: 65,
  speed: 45,
};

const onFavoriteClickMock = jest.fn();

it("Tests whether picture changes upon mouse enter", () => {
  const pokeCard = renderer.create(
    <PokemonCard
      pokemon={pokeMock}
      isFavorite={false}
      onFavoriteClick={onFavoriteClickMock}
    />
  );

  const tree = pokeCard.toJSON() as ReactTestRendererJSON;

  renderer.act(() => {
    tree.props.onMouseOver();
  });

  const images = pokeCard.root.findAllByType("img");
  const pokemonImage = images.find((image) => {
    return image.props.alt === "Bulbasaur";
  });
  expect(pokemonImage?.props.src).toEqual(
    "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif"
  );

  renderer.act(() => {
    tree.props.onMouseLeave();
  });

  expect(pokemonImage?.props.src).toEqual(
    "https://img.pokemondb.net/artwork/bulbasaur.jpg"
  );
});
