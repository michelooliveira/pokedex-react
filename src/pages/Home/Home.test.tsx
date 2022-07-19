import { waitFor, screen } from "@testing-library/react";
import { AxiosResponse } from "axios";
import NavBar from "components/Home/NavBar";
import PokemonCard from "components/Home/PokemonCard";
import PokemonList from "components/Home/PokemonList";
import SearchBar from "components/Home/SearchBar";
import {
  act,
  create,
  ReactTestRenderer,
  ReactTestRendererJSON,
} from "react-test-renderer";
import * as PokemonService from "services/pokemonService";
import Home from "./index";

const pokemonList = {
  data: {
    results: [
      {
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
      },
      {
        national_number: "002",
        evolution: null,
        sprites: {
          normal:
            "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/ivysaur.png",
          large: "https://img.pokemondb.net/artwork/ivysaur.jpg",
          animated:
            "https://img.pokemondb.net/sprites/black-white/anim/normal/ivysaur.gif",
        },
        name: "Ivysaur",
        type: ["Grass", "Poison"],
        total: 405,
        hp: 60,
        attack: 62,
        defense: 63,
        sp_atk: 80,
        sp_def: 80,
        speed: 60,
      },
      {
        national_number: "003",
        evolution: {
          name: "Mega Venusaur",
        },
        sprites: {
          normal:
            "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/venusaur.png",
          large: "https://img.pokemondb.net/artwork/venusaur.jpg",
          animated:
            "https://img.pokemondb.net/sprites/black-white/anim/normal/venusaur.gif",
        },
        name: "Venusaur",
        type: ["Grass", "Poison"],
        total: 625,
        hp: 80,
        attack: 100,
        defense: 123,
        sp_atk: 122,
        sp_def: 120,
        speed: 80,
      },
      {
        national_number: "003",
        evolution: null,
        sprites: {
          normal:
            "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/venusaur.png",
          large: "https://img.pokemondb.net/artwork/venusaur.jpg",
          animated:
            "https://img.pokemondb.net/sprites/black-white/anim/normal/venusaur.gif",
        },
        name: "Venusaur",
        type: ["Grass", "Poison"],
        total: 525,
        hp: 80,
        attack: 82,
        defense: 83,
        sp_atk: 100,
        sp_def: 100,
        speed: 80,
      },
      {
        national_number: "004",
        evolution: null,
        sprites: {
          normal:
            "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/charmander.png",
          large: "https://img.pokemondb.net/artwork/charmander.jpg",
          animated:
            "https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif",
        },
        name: "Charmander",
        type: ["Fire"],
        total: 309,
        hp: 39,
        attack: 52,
        defense: 43,
        sp_atk: 60,
        sp_def: 50,
        speed: 65,
      },
    ],
  },
};

jest.mock("services/pokemonService");

describe("Test Home components", () => {
  it("Test PokemonListBehavior", async () => {
    (PokemonService.getPokemonList as jest.Mock).mockResolvedValue({
      ...pokemonList,
    });
    let home: ReactTestRenderer | undefined;
    await act(() => {
      home = create(<Home />);
    });

    const pokemonListCards = home?.root.findAllByType("li").length;
    expect(PokemonService.getPokemonList).toBeCalledTimes(1);
    expect(pokemonListCards).toEqual(4);
    // );
  });
});
