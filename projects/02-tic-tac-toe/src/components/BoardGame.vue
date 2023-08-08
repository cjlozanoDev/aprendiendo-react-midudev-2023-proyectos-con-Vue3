<script setup>
import Square from './Square.vue'
import { boardActions } from '../common/BoardActions'
import { TURNS } from '../constans'

defineProps({
  boardGame: {
    type: Array,
    defautl: () => []
  }
})

const { boardGame, updateBoard, turn } = boardActions()

</script>

<template>
  <main class="board">
    <h1> Tic tac toe </h1>
    <button> Reset del juego </button>
    <section class="game">
      <div v-for="(square, index) in boardGame" :key="index">
        <Square :index="index" @update-board="updateBoard">
          {{ square }}
        </Square>
      </div>
    </section>
    <section class="turn">
      <Square :is-selected="turn === TURNS.X">
        X
      </Square>
      <Square :isSelected="turn === TURNS.O">
        O
      </Square>
    </section>
  </main>
</template>