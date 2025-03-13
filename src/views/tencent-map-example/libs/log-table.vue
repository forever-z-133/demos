<script setup lang="ts">
import type { LogTableRow } from './log.model'

interface Props {
  data: LogTableRow[]
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})
defineSlots<{
  default: (scope: { row: LogTableRow }) => any
}>()
</script>

<template>
  <table>
    <tbody>
      <tr>
        <th>请求发起时间</th>
        <th>操作</th>
      </tr>
      <template v-for="row in props.data" :key="row.reqUUID">
        <tr>
          <td>
            <div class="startTime text-overflow">
              {{ row.startTime }}
            </div>
          </td>
          <td style="width:6em">
            <slot name="default" :row="row" />
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
