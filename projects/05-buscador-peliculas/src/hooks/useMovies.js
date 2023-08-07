import { ref } from 'vue'
import { searchMovies } from '../services/movies.js'

export const useMovies = (search) => {
  const movies = ref([])
  const loading = ref(false)
  const error = ref(null)

  const getMovies = async () => {
    try {
      loading.value = true
      error.value = null
      const newMovies = await searchMovies(search.value)
      movies.value = newMovies
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return { movies, getMovies, loading }
}
