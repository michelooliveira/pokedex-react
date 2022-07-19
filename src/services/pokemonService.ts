import api from "./config";

export async function getPokemonList() {
  return api.get("/pokemons@1.1.0/pokemons.json");
}
