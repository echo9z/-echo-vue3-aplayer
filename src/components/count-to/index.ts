import type { App } from '@vue/runtime-core'
import { version } from '@/../package.json'
import CountTo from '@/components/count-to/index.vue'

export { CountTo }

const install = {
  CountTo,
  install(app: App) {
    app.component(CountTo.name, CountTo)
  },
  version
}

if (typeof window !== 'undefined' && (window as any).Vue) {
  (window as any).CountTo = install
}
export default install