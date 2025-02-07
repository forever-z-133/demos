<script setup lang="ts">
import CommonList from '@/components/common-list/index.vue'
import routes from '@/router/modules/cases'
import { groupBy } from 'lodash-es'
import { computed } from 'vue'

// 分组后的展示
const routesGroupArray = computed(() => {
  // 注：meta.group 配置来自于 @/router/types 的 RouteMeta
  const groups = groupBy(routes, 'meta.group')
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
  .route-group-list {
    .group-item {
      margin-bottom: .px(10)[];
    }

    .group-title {
      font-size: .px(18)[];
    }
  }
}
</style>
