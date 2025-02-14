<script setup lang="ts">
import { ref } from 'vue'
import Flipped from '../biz/Flipped.vue'
import Flipper from '../biz/Flipper.vue'

const open = ref(false)

function handleAnim() {
  open.value = !open.value
}
</script>

<template>
  <div class="flip-animation-simple">
    <div class="header">
      基础案例
      <button class="btn" @click="handleAnim">
        Toggle
      </button>
    </div>
    <Flipper :flip-key="open" class="wrapper" :class="[open ? 'expanded' : '']">
      <template v-for="i in 3" :key="i">
        <Flipped :flip-id="`square-${i + 1}`" class="square" :class="[open ? 'expanded' : '']" />
      </template>
    </Flipper>
  </div>
</template>

<style lang="less">
.flip-animation-simple {
  .wrapper {
    &.expanded {
      display: flex;
    }
  }

  .square {
    height: 50px;
    width: 200px;
    background: pink;
    align-items: center;
    padding: 16px;
    margin-bottom: 10px;

    &.expanded {
      height: 200px;
      width: 250px;
      text-align: center;
      background: lightblue;
      margin-right: 10px;
    }
  }
}
</style>
