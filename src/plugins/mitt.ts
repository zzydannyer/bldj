import type { Emitter } from 'mitt'
import mitt from 'mitt'

type Events = {
  showNavBar: boolean
  refresh: void
}

export const emitter: Emitter<Events> = mitt<Events>()
