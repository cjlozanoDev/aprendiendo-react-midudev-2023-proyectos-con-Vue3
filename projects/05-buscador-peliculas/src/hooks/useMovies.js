import { ref, computed } from 'vue'
import { searchMovies } from '../services/movies.js'

export const useMovies = sort => {
  const movies = ref([])
  const loading = ref(false)
  const error = ref(null)

  const previousSearch = ref(null)

  const getMovies = async (search) => {
    if (previousSearch.value === search.value) return
    try {
      loading.value = true
      error.value = null
      const newMovies = await searchMovies(search.value)
      movies.value = newMovies
      previousSearch.value = search.value
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const sortedMovies = computed(() => sort.value ? [...movies.value].sort((a, b) => a.title.localeCompare(b.title)) : movies.value)

  return { movies: sortedMovies, getMovies, loading }
}
