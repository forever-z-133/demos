<script setup lang="ts">
import type { HighlightResult } from 'highlight.js'
import { ref, watch } from 'vue'
import { getInstance, initial } from './highlight'

interface Props {
  code: string
  lang?: string
}
const props = withDefaults(defineProps<Props>(), {})

initial()
const hljs = getInstance()

const language = ref(props.lang)
const code = ref(props.code)

updateHighlightCode()
watch(props, () => updateHighlightCode())

// 更新代码着色
function updateHighlightCode() {
  let result: HighlightResult
  if (props.lang) {
    result = hljs.highlight(props.code, { language: props.lang })
  } else {
    result = hljs.highlightAuto(props.code)
  }
  const { value, language: lang } = result
  code.value = value
  language.value = lang || 'default'
}
</script>

<template>
  <pre class="code-view"><code class="hljs" :class="`language-${language}`" v-html="code" /></pre>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.code-view {
  margin: 0 0;
  padding: .px(4)[] .px(8)[];
  font-size: .8em;
  line-height: 1.375;
  background-color: #f8f8f8;
  overflow: auto;
  .items-gap(bottom, .px(8)[]);

  .hljs {
    background: none;
    padding: 0 0;
  }
}
</style>
