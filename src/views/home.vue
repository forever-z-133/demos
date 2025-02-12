<script setup lang="ts">
import type { RouteGroupKeys } from '@/router/types'
import type { RouteRecordRaw } from 'vue-router'
import CommonList from '@/components/common-list/index.vue'
import routes from '@/router/modules/cases'
import { groupBy } from 'lodash-es'
import { computed } from 'vue'

// 分组后的展示
const routesGroupArray = computed(() => {
  const groups = groupBy(routes, 'meta.group') as Record<RouteGroupKeys, RouteRecordRaw[]>
  return [
    { title: '功能', routes: groups.libs },
    { title: '效果', routes: groups.effect },
    { title: '其他', routes: groups.others },
    { title: '未分类', routes: groups.undefined },
  ].filter(e => e.routes?.length)
})
</script>

<template>
  <div class="page-home">
    <h1 class="block app-title">
      永恒的财宝
    </h1>
    <h2 class="block app-author">
      <span class="author">作者：张永恒</span>
      <span><a href="https://github.com/forever-z-133" target="_blank">github</a></span>
      <span><a href="mailto:617754841@qq.com" target="_blank">617754841@qq.com</a></span>
    </h2>
    <h3 class="block app-desc">
      用于存放和展示日常所做DEMO或源码研究
    </h3>
    <hr />
    <CommonList class="route-group-list" :data="routesGroupArray">
      <template #default="{ row: group }">
        <div class="group-item">
          <div class="group-title">
            {{ group.title }}
          </div>
          <div class="group-content">
            <CommonList class="route-group-list" :data="group.routes">
              <template #default="{ row }">
                <div class="route-item">
                  <div class="route-title">
                    <router-link :to="row.path" target="_blank">
                      <span>{{ row.meta?.title || row.name }}</span>
                    </router-link>
                  </div>
                </div>
              </template>
            </CommonList>
          </div>
        </div>
      </template>
    </CommonList>
  </div>
</template>

<style lang="less">
@import '@/styles/mixins.less';

.page-home {
  .items-gap(bottom);

  @media (min-width: 990px) {
    width: 50vw;
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;
  }

  .app-author {
    display: flex;
    gap: .px(12)[];
  }

  .app-author, .app-desc {
    font-size: .px(16)[];
  }

  .route-group-list {
    .group-item {
      margin-bottom: .px(10)[];
      .items-gap(bottom, .px(4)[]);
    }

    .group-title {
      font-size: 1.1em;
      font-weight: bold;
    }
  }
}
</style>
