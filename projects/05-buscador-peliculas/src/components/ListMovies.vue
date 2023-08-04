<script setup>
  defineProps({
    movies: {
      type: Array,
      default: () => []
    }
  })
</script>

<template>
  <ul>
    <li v-for="movie in movies" :key="movie.id">
      <h3>{{movie.title}}</h3>
      <p>{{movie.year}}</p>
      <img :src=movie.poster :alt="movie.title" />
    </li>
  </ul>
</template>