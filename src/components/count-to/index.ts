import type { App } from '@vue/runtime-core'
import { version } from '@/../package.json'
import CountTo from '@/components/count-to/index.vue'

export { CountTo }
export default {
  install(app: App) {
    app.component(CountTo.name, CountTo)
  },
  version
}
