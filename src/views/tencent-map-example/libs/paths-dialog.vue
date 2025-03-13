<script setup lang="ts">
import type { Point } from './guide-cloud-request.model'
import { ref } from 'vue'

interface Props {
  paths: Point[]
}
const props = withDefaults(defineProps<Props>(), {})

const visible = ref(false)

const Columns = [
  { colKey: 'lat', title: 'lat' },
  { colKey: 'lng', title: 'lng' },
  { colKey: 'op', title: '操作' },
]

function handleView(point: Point) {
  console.log(point)
}
</script>

<template>
  <TDialog :visible="visible" header="hello" attach="body" draggable mode="modeless">
    <TTable :data="props.paths" :columns="Columns" row-key="index" max-height="200px">
      <template #op="{ row }">
        <TButton variant="text" theme="primary" @click="handleView(row)">
          查看
        </TButton>
      </template>
    </TTable>
  </TDialog>
</template>
