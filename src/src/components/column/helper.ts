import type { InjectionKey, Ref } from 'vue'
import { ref } from 'vue'

// 多栏布局配置
export interface ColumnProps {
  column?: number
  gap?: number | number[]
  align?: 'top' | 'start' | 'middle' | 'center' | 'bottom' | 'end'
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
}

// 多栏布局默认配置
export const DefaultColumnNumber: ColumnProps['column'] = 1
export const DefaultGap: [number, number] = [0, 0]

// 多栏项配置
export interface ColumnItemProps {
  span?: number
}

// 传递给项的配置
interface InjectProps {
  column: Ref<number>
  gap: Ref<[number, number]>
}
export const ColumnInjectKey: InjectionKey<InjectProps> = Symbol('column-inject')
export const DefaultColumnInject: InjectProps = {
  column: ref(DefaultColumnNumber),
  gap: ref(DefaultGap),
}

// 数字专为 px 字符串
export function unit(n: number | string) {
  if (typeof n === 'number') return `${n}px`
  return n
}
