import axios from 'axios';

export default defineEventHandler(async (event) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=60');
    return {
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching from Pokemon API:', error);
    return {
      error: 'Failed to fetch data',
    };
  }
});
