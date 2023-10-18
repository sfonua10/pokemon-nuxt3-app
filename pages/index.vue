<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Pokédex
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          A list of Pokémon from the PokeAPI.
        </p>
        <div>
          <label for="search" class="sr-only">Search Pokémon</label>
          <input
            type="text"
            name="search"
            id="search"
            v-model="searchTerm"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search Pokémon..."
          />
        </div>
      </div>
      <ul
        role="list"
        class="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
      >
        <li v-for="pokemon in filteredPokemonList" :key="pokemon.name">
          <NuxtLink :to="`/pokemon/profile/${pokemon.name}`">
            <img
              class="mx-auto h-24 w-24 rounded-full"
              :src="getPokemonImageUrl(pokemon.url)"
              alt=""
            />
            <h3
              class="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900"
            >
              {{ pokemon.name }}
            </h3>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed } from "vue";

const pokemonList = ref([]);
const searchTerm = ref("");

onMounted(async () => {
  try {
    const response = await axios.get("/api/pokemon");
    if (
      response.status === 200 &&
      response.data.data &&
      response.data.data.results
    ) {
      pokemonList.value = response.data.data.results;
    }
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
});

const getPokemonImageUrl = (pokemonApiUrl) => {
  const id = pokemonApiUrl.split("/").slice(-2, -1)[0];
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

const filteredPokemonList = computed(() => {
  return pokemonList.value.filter((pokemon) =>
    pokemon.name.includes(searchTerm.value.toLowerCase())
  );
});
</script>
