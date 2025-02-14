import type { Flipper } from 'flip-toolkit'
import type { InjectionKey } from 'vue'

// 传递给项的配置
interface InjectProps {
  getInstance: () => Flipper
}
export const FlipperInjectKey: InjectionKey<InjectProps> = Symbol('flipper-inject')
