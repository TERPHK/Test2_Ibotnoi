import { createRouter, createWebHistory } from 'vue-router';
import PokemonList from '../components/PokemonList.vue';
import PokemonDetail from '../components/PokemonDetail.vue';

const routes = [
  { path: '/', component: PokemonList },
  {
    path: '/pokemon-detail',
    name: 'pokemon-detail',
    component: PokemonDetail,
    props: route => ({ pokemon: route.params.pokemon })
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
