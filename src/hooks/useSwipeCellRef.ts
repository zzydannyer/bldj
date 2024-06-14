import type { SwipeCellInstance } from 'vant'

export default function useSwipeCellRef() {
  const swipeCellRef = ref<SwipeCellInstance[]>([])

  function resetSwipeCell() {
    swipeCellRef.value = []
  }
  onBeforeUpdate(resetSwipeCell)
  return { swipeCellRef }
}
