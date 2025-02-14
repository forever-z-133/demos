<script setup lang="ts">
import { ref } from 'vue'
import Flipped from '../biz/Flipped.vue'
import Flipper from '../biz/Flipper.vue'

const open = ref<number | null>(null)

function handleAnim(index: number) {
  if (open.value === index) open.value = null
  else open.value = index
}
</script>

<template>
  <div class="flip-animation-complex">
    <div class="header">
      复杂案例（点击头像）
    </div>
    <Flipper :flip-key="open" spring="gentle" class="wrapper">
      <template v-for="i in 3" :key="i">
        <template v-if="open === i">
          <Flipped :flip-id="`item-${i + 1}`" class="item expanded">
            <Flipped :inner-flip-id="`item-${i + 1}`" class="item-wrapper">
              <Flipped :flip-id="`avatar-${i}`" class="avatar" @click="handleAnim(i)" />
              <div class="content">
                <template v-for="l in 3" :key="l">
                  <Flipped :flip-id="`line-${i}-${l}`" class="line" />
                </template>
              </div>
              <template v-for="d in 3" :key="d">
                <Flipped :flip-id="`desc-${i}-${d}`" :delay-until="`item-${i + 1}`" class="desc" />
              </template>
            </Flipped>
          </Flipped>
        </template>
        <template v-else>
          <Flipped :flip-id="`item-${i + 1}`" class="item">
            <Flipped :inner-flip-id="`item-${i + 1}`" class="item-wrapper">
              <Flipped :flip-id="`avatar-${i}`" class="avatar" @click="handleAnim(i)" />
              <div class="content">
                <template v-for="l in 3" :key="l">
                  <Flipped :flip-id="`line-${i}-${l}`" class="line" />
                </template>
              </div>
            </Flipped>
          </Flipped>
        </template>
      </template>
    </Flipper>
  </div>
</template>

<style lang="less">
@import '@/styles/mixins.less';

.flip-animation-complex {
  .item {
    .item-wrapper {
      .flex-row(~'.content');
      gap: .px(12)[];
      border: 1px solid #e5e5e5;
      padding: .px(10)[] .px(10)[];

      .avatar {
        width: .px(50)[];
        height: .px(50)[];
        background: #ccc;
        border-radius: 100%;
      }

      .content {
        .items-gap(bottom, .px(6)[]);
      }

      .line {
        width: 100%;
        height: .px(10)[];
        background: #ccc;
      }

      .desc {
        width: 100%;
        height: .px(40)[];
        background: #ccc;
      }
    }

    &.expanded {
      .item-wrapper {
        flex-direction: column;

        .avatar {
          width: .px(100)[];
          height: .px(100)[];
        }

        .line {
          width: .px(200)[];
        }
      }
    }
  }
}
</style>
