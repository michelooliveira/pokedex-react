import { Pokemon } from "interfaces";

const matchesKey = (item: Pokemon, key: string, term: string) =>
  String(item[key as keyof Pokemon])
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .includes(
      term
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    );

export const applySearchFilter = (pokemonArray: Pokemon[], search: string) =>
  pokemonArray.filter(
    (pokemon) =>
      matchesKey(pokemon, "name", search) ||
      matchesKey(pokemon, "national_number", search)
  );

export const getUniqueValues = (newData: Pokemon[]) => {
  const distinctValues = [
    ...new Map(newData.map((x: Pokemon) => [x.national_number, x])).values(),
  ];
  console.log({ distinctValues });
  return distinctValues;
};
