import axios from "axios";
import FilterPanel from "components/Home/FilterPanel";
import SearchBar from "components/Home/SearchBar";
import SortToggle from "components/Home/SortToggle";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCallback } from "react";
import { Col, Container, Row } from "reactstrap";
import NavBar from "components/Home/NavBar";
import { Pokemon } from "interfaces";
import PokemonList from "components/Home/PokemonList";
import { applySearchFilter, getUniqueValues } from "utils";

type SortingValues = "AN" | "DN" | "AR" | "DR";

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [pokemonFilters, setPokemonFilters] = useState({
    searchTerm: "",
    showFavorites: false,
    pokemonTypes: [] as string[],
    sorting: "A" as SortingValues,
  });
  const fetchedPokemonsRef = useRef<Pokemon[]>([]);

  const fetchPokemons = useCallback(async () => {
    try {
      const response = await axios(
        "https://unpkg.com/pokemons@1.1.0/pokemons.json"
      );
      const res = response.data;
      const uniquePokemons = getUniqueValues(res.results);
      setPokemons(uniquePokemons);
      fetchedPokemonsRef.current = uniquePokemons;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const selectOptions = useMemo(
    () => [
      {
        label: "Ordenar pelo menor número",
        value: "AR",
      },
      { label: "Ordenar pelo maior número", value: "DR" },
      { label: "Ordenar por A-Z", value: "AN" },
      { label: "Ordenar por Z-A", value: "DN" },
    ],
    []
  );

  const handleChangeSortFilter = useCallback((value: SortingValues) => {
    setPokemonFilters((prev) => ({
      ...prev,
      sorting: value,
    }));
  }, []);

  const handleSearchTermChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPokemonFilters((prev) => ({
        ...prev,
        searchTerm: e.target.value,
      }));
    },
    []
  );

  const handleTypeSelect = useCallback(
    (type: string, checked: boolean): void => {
      if (type) {
        setPokemonFilters((prev) => {
          if (checked) {
            return {
              ...prev,
              pokemonTypes: [...prev.pokemonTypes, type],
            };
          }
          return {
            ...prev,
            pokemonTypes: [
              ...prev.pokemonTypes.filter(
                (pokemonType) => pokemonType !== type
              ),
            ],
          };
        });
      }
    },
    []
  );

  const handleShowFavoritesToggle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void =>
      setPokemonFilters((prev) => ({
        ...prev,
        showFavorites: e.target.checked,
      })),
    []
  );

  const sortPokemonsByNumber = useCallback(
    (pokemonsToFilter: Pokemon[]): Pokemon[] => {
      return pokemonsToFilter.sort((pokemonA, pokemonB) => {
        if (pokemonFilters.sorting === "AR") {
          return +pokemonA.national_number - +pokemonB.national_number;
        }
        if (pokemonFilters.sorting === "DR") {
          return +pokemonB.national_number - +pokemonA.national_number;
        }
        if (pokemonFilters.sorting === "AN") {
          return String(pokemonA.name).localeCompare(String(pokemonB.name));
        }

        return String(pokemonB.name).localeCompare(String(pokemonA.name));
      });
    },
    [pokemonFilters.sorting]
  );

  useEffect(() => {
    const handleFilterChange = () => {
      setPokemons(() => {
        let filteredPokemons = [...fetchedPokemonsRef.current];
        if (pokemonFilters.showFavorites) {
          filteredPokemons = filteredPokemons.filter((filteredPokemon) =>
            favoritePokemons.some(
              (favoritePokemon) =>
                filteredPokemon.national_number ===
                favoritePokemon.national_number
            )
          );
        }
        filteredPokemons = applySearchFilter(
          filteredPokemons,
          pokemonFilters.searchTerm
        );
        if (pokemonFilters.pokemonTypes.length) {
          filteredPokemons = filteredPokemons.filter((filteredPokemon) =>
            pokemonFilters.pokemonTypes.some((pokemonType) =>
              filteredPokemon.type.includes(pokemonType)
            )
          );
        }
        filteredPokemons = sortPokemonsByNumber(filteredPokemons);
        return filteredPokemons;
      });
    };
    handleFilterChange();
  }, [pokemonFilters]);

  const handlePokemonFavoriteClick = useCallback(
    (chosenPokemon: Pokemon) => {
      const favorites = [...favoritePokemons];

      const pokemonIsFavorite = favorites?.find(
        (pokemon) => pokemon.national_number === chosenPokemon.national_number
      );
      setFavoritePokemons((prev) => {
        if (pokemonIsFavorite) {
          return prev.filter(
            (pokemon) =>
              pokemon.national_number !== chosenPokemon.national_number
          );
        }
        return [...prev, chosenPokemon];
      });
    },
    [favoritePokemons]
  );

  const getTypesFilters = useCallback((): string[] => {
    let types: string[] = [];
    pokemons.forEach((pokemon) => {
      types = [...types, ...pokemon.type];
    });
    return Array.from([...new Set(types)]);
  }, [pokemons]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    if (pokemons.length && !pokemonTypes.length) {
      setPokemonTypes(getTypesFilters());
    }
  }, [pokemons, pokemonTypes]);

  return (
    <>
      <NavBar />
      <main>
        <Container className="p-0 w-75" fluid>
          <Row>
            <Col xs={12} md={6} className="p-3">
              <SearchBar
                onChange={handleSearchTermChange}
                placeholder="Pesquisar por nome ou número"
              />
            </Col>
            <Col xs={12} md={6} className="p-3">
              <SortToggle
                options={selectOptions}
                onChange={(e) =>
                  handleChangeSortFilter(e.target.value as SortingValues)
                }
              />
            </Col>
          </Row>
          <Row>
            <Col lg={2}>
              <FilterPanel
                onTypeSelect={handleTypeSelect}
                pokemonTypes={pokemonTypes}
                onChangeFavoriteToggle={handleShowFavoritesToggle}
                favoritesFilterActive={pokemonFilters.showFavorites}
              />
            </Col>
            <Col lg={10}>
              <PokemonList
                favoritePokemons={favoritePokemons}
                onFavoriteClick={handlePokemonFavoriteClick}
                pokemonList={pokemons}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Home;
