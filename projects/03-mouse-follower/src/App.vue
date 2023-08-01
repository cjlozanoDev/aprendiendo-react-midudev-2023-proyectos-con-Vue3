<script setup>
import { ref, reactive, watchEffect, watch } from 'vue'
import './index.css';

const enabled = ref(false)
const position = reactive({x: 0, y: 0})

const handlerMove = event => {
  const { clientX, clientY } = event
  position.x = clientX
  position.y = clientY
}

watch(enabled, () => {
  if (enabled.value) {
    window.addEventListener('pointermove', handlerMove)
  } else {
    window.removeEventListener('pointermove', handlerMove)
  }
})

watchEffect(() => {
  document.body.classList.toggle('no-cursor', enabled.value)
})

</script>

<template>
  <div :style="{
    position: 'absolute',
    backgroundColor: '#09f',
    borderRadius: '50%',
    opacity: 0.8,
    pointerEvents: 'none',
    left: '-20px',
    top: '-20px',
    width: '40px',
    height: '40px',
    transform: `translate(${position.x}px, ${position.y}px)`
  }"/>

  <button @click="() => enabled = !enabled"> {{enabled ? 'Desactivar' : 'Activar'}} puntero </button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
