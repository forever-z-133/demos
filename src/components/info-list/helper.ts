import type { InjectionKey, Ref } from 'vue'
import type { ColumnProps } from '../column/helper'

// 多栏布局配置
export interface InfoListProps extends ColumnProps {
  // 介绍词宽度
  labelWidth?: 'auto' | string | number
  // 介绍词所在位置
  labelPosition?: 'left' | 'right' | 'top'
  // 介绍词与内容之间的文本
  connection?: string
}

// 多栏项配置
export interface InfoItemProps {
  // 介绍词宽度，会覆盖 InfoList 父组件的值
  labelWidth?: 'auto' | string | number
  // 介绍词所在位置，会覆盖 InfoList 父组件的值
  labelPosition?: 'left' | 'right' | 'top'
  // 介绍词与内容之间的文本
  connection?: string
  // 介绍词
  label?: string
  // 内容
  value?: string | number
  // 鼠标在内容上悬停时显示的内容
  tooltip?: string | number
  // 内容超长时是否显示省略号
  ellipsis?: boolean
}

// 传递给项的配置
interface InjectProps {
  column: Ref<number>
  gap: Ref<[number, number]>
}
export const InfoListInjectKey: InjectionKey<InjectProps> = Symbol('info-list-inject')
