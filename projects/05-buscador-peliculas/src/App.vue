<script setup>
import './index.css'
import { useMovies } from  './hooks/useMovies'
import { ref, reactive, watch } from 'vue'
import ListMovies from './components/ListMovies.vue';

const { movies } = useMovies()
const foundMovies = reactive(movies)
const query = ref('')
const error = ref(null)

const handleSubmit = (event) => {
  event.preventDefault();
}

watch(query, newQuery => {
  if (newQuery === '') {
    error.value='No se puede buscar una película vacía'
    return
  }
  if (newQuery.match(/^\d+$/)) {
    error.value='No se puede buscar una película con un número'
    return
  }
  if (newQuery.length < 3) {
    error.value='La búsqueda debe tener al menos 3 caracteres'
    return
  }
  error.value=null
})

</script>

<template>
  <div class='page'>
    <header>
      <h1> Buscador de películas </h1>
      <form class='form' @submit="handleSubmit">
        <input
          type="text"
          v-model="query"
          placeholder='Avengers, StarWars, The Matrix...'
          :style="{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent'
          }"/>
        <button type='submit'>Buscar </button>
      </form>
      <p v-if="error" :style="{ color: 'red' }">
        {{error}}
      </p>
    </header>

    <main>
      <ListMovies :movies="foundMovies"/>
    </main>
  </div>
</template>

