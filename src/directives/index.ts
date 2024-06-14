import type { App } from 'vue'
import { setupAuthDirective } from './auth'

export default function setupDirectives(app: App) {
  setupAuthDirective(app)
}
