import { ref } from 'vue'
import { TURNS } from '../constans'

export const boardActions = () => {
  const boardGame = ref(Array(9).fill(null))
  const turn = ref(TURNS.X)

  const updateBoard = index => {
    boardGame.value[index] = turn.value
    turn.value = turn.value === TURNS.X ? TURNS.O : TURNS.X
  }
  return { boardGame, updateBoard, turn }
}
