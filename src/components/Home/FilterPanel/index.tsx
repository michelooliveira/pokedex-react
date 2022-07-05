import React, { useCallback } from "react";
import ToggleButton from "../ToggleButton";
import PokemonTypeInput from "./PokemonTypeInput";
import "./styles.scss";

interface FilterPanelProps {
  pokemonTypes: string[];
  onTypeSelect: (type: string, checked: boolean) => void;
  onChangeFavoriteToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  favoritesFilterActive: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  pokemonTypes,
  onTypeSelect,
  onChangeFavoriteToggle,
  favoritesFilterActive,
}) => {
  const handleTypeSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = e.target;
      onTypeSelect(value, checked);
    },
    []
  );

  return (
    <div className="filter-list__container">
      <div className="filter-list__title">
        <span>Filtrar por tipo</span>
      </div>
      <div className="d-flex flex-wrap gap-1">
        {pokemonTypes.map((pokemonType) => (
          <PokemonTypeInput
            onChange={handleTypeSelect}
            key={pokemonType}
            pokemonType={pokemonType}
          />
        ))}
      </div>
      <div className="filter-list__show-favorites">
        <span> Filtrar favoritos</span>
        <ToggleButton
          checked={favoritesFilterActive}
          onChange={onChangeFavoriteToggle}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
