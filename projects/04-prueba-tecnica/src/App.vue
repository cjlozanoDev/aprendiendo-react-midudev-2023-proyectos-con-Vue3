<script setup>
  import { onMounted , ref, watch} from 'vue'
  import './app.css'

  const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
  const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

  const factData = ref(null);
  const imageUrl = ref(null);

  onMounted(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        factData.value = fact
        console.log(factData.value)
      })
  })

  watch(factData,() => {
    console.log(factData.value)
    const firstWorld = factData.value.split(' ')[0]
    console.log(firstWorld)

    fetch(`https://cataas.com/cat/says/${firstWorld}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        imageUrl.value = url
      })
  })
</script>

<template>
  <main>
    <h1> App de gatitos </h1> 
    <p v-if="factData">
    {{ factData }}
    </p>
    <img v-if="imageUrl" :src="`${CAT_PREFIX_IMAGE_URL}${imageUrl}`" :alt="`Image extracted using the first word for ${factData}`"/>
  </main>
</template>