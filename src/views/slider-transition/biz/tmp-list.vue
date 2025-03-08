<script setup lang="ts">
import { CommonList } from '@/components'
</script>

<template>
  <CommonList :length="2">
    <template #default="{ row }">
      <span>列表项-{{ row.id }}</span>
    </template>
  </CommonList>
</template>
