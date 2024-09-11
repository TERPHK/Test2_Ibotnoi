<template>
    <div>
      <button @click="fetchPokemons">Get Pokémon</button>
      <div v-if="pokemonList.length > 0">
        <select v-model="selectedPokemonId" @change="fetchPokemonDetails">
          <option v-for="pokemon in pokemonList" :key="pokemon.id" :value="pokemon.id">
            {{ pokemon.name }}
          </option>
        </select>
      </div>
      <div v-if="selectedPokemon">
        <h1>{{ selectedPokemon.name }}</h1>
        <img :src="selectedPokemon.sprites.front_default" :alt="selectedPokemon.name" />
        <p><strong>Type 1:</strong> {{ selectedPokemon.types[0]?.type.name }}</p>
        <p v-if="selectedPokemon.types[1]"><strong>Type 2:</strong> {{ selectedPokemon.types[1]?.type.name }}</p>
        <h2>Base Stats</h2>
        <ul>
          <li v-for="stat in selectedPokemon.stats" :key="stat.stat.name">
            <strong>{{ stat.stat.name }}:</strong> {{ stat.base_stat }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const pokemonList = ref([]);
      const selectedPokemonId = ref(null);
      const selectedPokemon = ref(null);
  
      const fetchPokemons = async () => {
        try {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          pokemonList.value = data.results.map((pokemon, index) => ({
            ...pokemon,
            id: index + 1 // เพิ่ม id ตามลำดับ
          }));
        } catch (error) {
          console.error('Error fetching Pokémon list:', error);
        }
      };
  
      const fetchPokemonDetails = async () => {
        if (selectedPokemonId.value) {
          try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonId.value}/`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            selectedPokemon.value = await response.json();
          } catch (error) {
            console.error('Error fetching Pokémon details:', error);
          }
        }
      };
  
      return {
        pokemonList,
        selectedPokemonId,
        selectedPokemon,
        fetchPokemons,
        fetchPokemonDetails
      };
    }
  };
  </script>
  <style src="../assets/styles.css">
</style>