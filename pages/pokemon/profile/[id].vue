<template>
  <div class="relative bg-white">
    <!-- Pokémon Image -->
    <img
      :src="pokemon.sprites?.other?.home?.front_default"
      alt="pokemon.name"
      class="object-cover my-0 mx-auto max-w-7xl lg:grid lg:inset-y-0 lg:left-0 lg:w-1/2 lg:h-auto lg:absolute"
    />

    <!-- Content Area -->
    <div class="mx-auto grid max-w-7xl lg:grid-cols-2">
      <div
        class="px-6 pb-24 pt-16 sm:pb-32 sm:pt-20 lg:col-start-2 lg:px-8 lg:pt-32"
      >
        <div class="mx-auto max-w-2xl lg:mr-0 lg:max-w-lg">
          <!-- Pokémon Name -->
          <h2 class="text-base font-semibold leading-8 text-indigo-600">
            {{ pokemon.name }}
          </h2>

          <!-- Pokémon Description (Height and Weight) -->
          <p
            class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Height: {{ pokemon.height / 10 }} m | Weight:
            {{ pokemon.weight / 10 }} kg
          </p>

          <!-- Pokémon Abilities -->
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Abilities:
            <span v-for="(ability, index) in pokemon.abilities" :key="index"
              >{{ ability.ability.name
              }}<span v-if="index < pokemon.abilities.length - 1"
                >,
              </span></span
            >
          </p>

          <!-- Pokémon Stats -->
          <dl
            class="mt-16 grid max-w-xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 xl:mt-16"
          >
            <div
              v-for="stat in mappedStats"
              :key="stat.name"
              class="flex flex-col gap-y-3 border-l border-gray-900/10 pl-6"
            >
              <dt class="text-sm leading-6 text-gray-600">{{ stat.name }}</dt>
              <dd
                class="order-first text-3xl font-semibold tracking-tight text-gray-900"
              >
                {{ stat.stat }}
              </dd>
            </div>
          </dl>

          <!-- Pokémon Moves -->
          <div class="mt-16">
            <button
              @click="toggleModal"
              class="p-2 bg-blue-500 text-white rounded"
            >
              Show Moves
            </button>

            <ul v-if="showMoves">
              <li
                v-for="move in pokemon.moves"
                :key="move.move.name"
                class="my-1"
              >
                {{ move.move.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal for showing Pokemon moves -->
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <!-- Updated close button -->
                <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    @click="toggleModal"
                  >
                    <span class="sr-only">Close</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div class="sm:flex sm:items-start">
                  <div
                    class="md:mx-auto md:flex md:h-20 md:w-20 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <img
                      :src="pokemon.sprites?.other?.dream_world?.front_default"
                      alt="pokemon.name"
                      class="h-full w-full object-cover rounded-full"
                    />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                      >{{ pokemon.name }}'s Moves</DialogTitle
                    >
                    <div class="mt-2">
                      <ul>
                        <li
                          v-for="move in pokemon.moves"
                          :key="move.move.name"
                          class="text-sm text-gray-500"
                        >
                          {{ move.move.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const open = ref(false);
const route = useRoute();
const pokemon = ref<any>({});
const showMoves = ref(false);

const toggleModal = () => {
  open.value = !open.value;
};
console.log("THIS IS A NEW CHANGE")

onMounted(async () => {
  try {
    const pokemonName = route.params.id;
    console.log('pokemonName', pokemonName)
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon data.");
    }
    const data = await response.json();
    pokemon.value = data;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
});

const mappedStats = computed(() => {
  return pokemon.value.stats
    ? pokemon.value.stats.map((s) => ({
        name: s.stat.name.replace("-", " "),
        stat: s.base_stat.toString(),
      }))
    : [];
});
</script>

<style scoped>
/* Additional styles can be added here */
</style>
