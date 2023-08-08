<script setup>
const props = defineProps({
  isSelected: {
    type: Boolean,
    default: false
  },
  index: {
    type: Number,
    default: null
  }
})
const emit = defineEmits(['update-board'])

const hanldeClick = () => {
  emit('update-board', props.index)
}
</script>

<template>
  <div @click="hanldeClick" :class="['square', {'is-selected': isSelected}]">
    <slot />
  </div>
</template>