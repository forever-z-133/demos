import{_ as y}from"./index.vue_vue_type_script_setup_true_lang.Dvam-HbT.js";import"./index.vue_vue_type_style_index_0_lang.C7RIy2qt.js";import"./column.vue_vue_type_style_index_0_scoped_0163b564_lang.UHUi-yvq.js";import{a as k}from"./index.OUztobxQ.js";import{_ as x}from"./index.BHcdEe5v.js";import{k as a,o as r,l as e,m as o,h as $,n as c,q as i,w as d,p,F as m,s as f,v as b,t as u}from"./vue.gVHh-qxJ.js";import"./highlight.rmF5D-84.js";const w={},S={class:"infinite-marquee"},q={class:"wrapper"},C={class:"wrapper","aria-hidden":""};function B(n,l){return r(),a("div",S,[e("div",q,[o(n.$slots,"default")]),e("div",C,[o(n.$slots,"default")])])}const _=x(w,[["render",B]]),N={class:"pure-css-infinite-marquee"},V={class:"case"},F={class:"case"},X={class:"block"},z=`<template>
  <div class="infinite-marquee">
    <div class="wrapper">
      <slot />
    </div>
    <div class="wrapper" aria-hidden>
      <slot />
    </div>
  </div>
<template>

<style lang="less">
.infinite-marquee {
  display: flex;
  --animation-duration: 10s;

  & > .wrapper {
    flex-shrink: 0;
    display: flex;
    animation: scrolling var(--animation-duration) linear infinite;
  }
}

@keyframes scrolling {
  to { transform: translateX(-100%); }
}
</style>
`,Z=$({title:"纯 CSS 实现无限滚动",group:"effect",__name:"index",setup(n){const l=["pink","lightgray","lightblue","lightgreen","lightcyan"],v=Array.from({length:10},(h,s)=>`100000000${k(s+1)}`);return(h,s)=>(r(),a("div",N,[s[0]||(s[0]=e("p",{class:"block"},[c(" 纯 CSS 实现无限滚动。靠拷贝一份子元素，完成前后尾的拼接，然后进行 "),e("code",null,"transform: translateX(-100%)"),c(" 的动画即可。 ")],-1)),s[1]||(s[1]=e("p",{class:"block"}," 注意：动画时长应当随子元素宽度而变化，需动态计算。 ",-1)),e("div",V,[i(_,null,{default:d(()=>[(r(),a(m,null,f(l,(t,g)=>e("div",{key:t,class:"card",style:b({background:t})},u(g),5)),64))]),_:1})]),e("div",F,[i(_,null,{default:d(()=>[(r(!0),a(m,null,f(p(v),t=>(r(),a("span",{key:t,class:"number"},u(t),1))),128))]),_:1})]),e("div",X,[i(p(y),{code:z})])]))}});export{Z as default};
