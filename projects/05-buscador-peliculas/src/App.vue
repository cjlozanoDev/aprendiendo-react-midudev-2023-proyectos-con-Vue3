<script setup>
import './index.css'
import { useMovies } from  './hooks/useMovies'
import { ref, reactive, watch } from 'vue'
import ListMovies from './components/ListMovies.vue';


const useSearch = () => {
  const search = ref('')
  const error = ref(null)

  watch(search, newSearch => {
    if (newSearch === '') {
      error.value='No se puede buscar una película vacía'
      return
    }
    if (newSearch.match(/^\d+$/)) {
      error.value='No se puede buscar una película con un número'
      return
    }
    if (newSearch.length < 3) {
      error.value='La búsqueda debe tener al menos 3 caracteres'
      return
    }
    error.value=null
  })
  return { search, error }
}


const sort = ref(false)
const { search, error } = useSearch()
const { movies, getMovies, loading } = useMovies(sort)
const isFirstInput = ref(true)
const debounce = ref(null)

const debouncedGetMovies = () => {
  clearTimeout(debounce.value)
  debounce.value = setTimeout(() => {
    getMovies(search)
  }, 300)
}

const handleChange = () => {
  console.log('hola')
  debouncedGetMovies()
}



const handleSubmit = (event) => {
  event.preventDefault();
  getMovies(search);
  if (isFirstInput.value) {
    isFirstInput.value = false;
  } 

}

</script>

<template>
  <div class='page'>
    <header>
      <h1> Buscador de películas </h1>
      <form class='form' @submit="handleSubmit">
        <input
          type="text"
          v-model="search"
          @input="handleChange"
          placeholder='Avengers, StarWars, The Matrix...'
          :style="{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent'
          }"/>
          <input type="checkbox" v-model="sort"/>
        <button type='submit'>Buscar </button>
      </form>
      <p v-if="error" :style="{ color: 'red' }">
        {{error}}
      </p>
    </header>

    <main>
      <p v-if="loading"> Cargando ... </p>
      <ListMovies v-if="movies?.length" :movies="movies"/>
      <p v-if="!movies?.length && !isFirstInput"> No se encontraron películas para esta búsqueda</p>
    </main>
  </div>
</template>

