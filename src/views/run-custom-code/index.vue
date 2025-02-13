<script setup lang="ts">
import { CodeView } from '@/components'
import { get } from 'lodash-es'
import { onMounted, ref } from 'vue'

defineOptions({
  title: '运行自定义脚本',
  group: 'libs',
  layout: 'pure',
})

const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor

const state = { state: { a: 1 }, get }
const input = ref(`return ctx.get(ctx.state, 'a') + 2`)
const output = ref('')

onMounted(() => {
  handleRun()
})

async function handleRun() {
  try {
    const res = await runScript(input.value, state)
    const result = res
    output.value = result
    return result
  } catch (e) {
    console.error(e)
  }
}

async function runScript(command: string, ctx: any) {
  const fn = new AsyncFunction('ctx', `${command}`)
  const result = await fn(ctx)
  return result
}

const code1 = `// 异步
async function runScript(command, ctx) {
  const fn = eval.call(this, \`async (ctx) => {\${command} }\`);
  return await fn(ctx);
}

// 同步
function runScriptSync(command, ctx) {
  const fn = eval.call(this, \`(ctx) => {\${command}}\`);
  return fn(ctx);
}`

const code2 = `// 异步
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
async function runScript(command, ctx) {
  const fn = new AsyncFunction('ctx', \`\${command}\`);
  return await fn(ctx);
}

// 同步
function runScriptSync(command, ctx) {
  const fn = new Function('ctx', \`return \${command}\`);
  return fn(ctx);
}`
</script>

<template>
  <div class="run-custom-code">
    <p class="block">
      做低码开发时，会经常遇到可供用户编写的地方，比如某元素字段的值读取或计算变量，某接口可用代码编写格式转换等等。
    </p>
    <div class="case">
      <div class="tips">
        脚本中可使用 `ctx` 变量，当前变量值为 { state: { a: 1 }, get: require('lodash-es').get }
      </div>
      <div class="input-wrapper">
        <textarea v-model="input" />
        <button class="btn" @click="handleRun">
          运行
        </button>
      </div>
      <div class="output">
        运行结果：{{ output }}
      </div>
    </div>
    <div>一般有两种方案，效果差不太多，案例中用的方案二的异步。还有自已写词法解析与编译的，但暂未遇到需要如此高深的场景。</div>
    <p class="block">
      方案一：使用 eval 函数
    </p>
    <div class="block">
      <CodeView :code="code1" />
    </div>
    <p class="block">
      方案二：使用 Function 构造
    </p>
    <div class="block">
      <CodeView :code="code2" />
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.run-custom-code {
  .items-gap(bottom);

  .case {
    border-top: 1px solid #e6e6e6;
    padding-top: .px(12)[];
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: .px(12)[];
    .items-gap(bottom, .px(8)[]);
  }

  .input-wrapper {
    textarea {
      font: inherit;
      display: block;
      width: 100%;
      height: 5em;
      padding: .px(2)[] .px(8)[];
    }

    button {
      display: block;
      width: 100%;
      margin-top: .px(4)[];
    }
  }

  .tips {
    font-size: .8em;
    color: #999;
    margin-bottom: .px(6)[];
  }
}
</style>
