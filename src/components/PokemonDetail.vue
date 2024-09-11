<template>
    <div>
      <div v-if="pokemon">
        <h1>{{ pokemon.name }}</h1>
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
        
        <p><strong>Type 1:</strong> {{ pokemon.types[0]?.type.name }}</p>
        <p v-if="pokemon.types[1]"><strong>Type 2:</strong> {{ pokemon.types[1]?.type.name }}</p>
        
        <h2>Base Stats</h2>
        <ul>
          <li v-for="stat in pokemon.stats" :key="stat.stat.name">
            <strong>{{ stat.stat.name }}:</strong> {{ stat.base_stat }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const route = useRoute();
      const pokemon = ref(null);
  
      onMounted(async () => {
        const id = route.params.id;
        if (id) {
          try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            pokemon.value = await response.json();
            console.log('Fetched Pokémon details:', pokemon.value); // ตรวจสอบข้อมูลที่ดึงมา
          } catch (error) {
            console.error('Error fetching Pokémon details:', error);
          }
        }
      });
  
      return {
        pokemon
      };
    }
  };
  </script>
  