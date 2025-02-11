import{_ as r}from"./index.vue_vue_type_script_setup_true_lang.BFtrR6Ak.js";import"./index.vue_vue_type_style_index_0_lang.5rXx282V.js";import"./column.vue_vue_type_style_index_0_scoped_0163b564_lang.UHUi-yvq.js";import{h as s,k as l,l as o,n as t,q as a,p as n,o as d}from"./vue.gVHh-qxJ.js";import"./index.DmD07DX5.js";import"./highlight.rmF5D-84.js";const c={class:"css-hive"},v={class:"block"},p=`.hive {
  --sqrt-3: 1.7320508075688772; /*根号3*/
  --width: 100px; /*注意蜂巢的宽高不同*/
  --hive-background: pink;
  --border-color: gray;
  --border-width: 8px;

  background-color: var(--hive-background);
  width: var(--width);
  height: calc(var(--width) / var(--sqrt-3) * 2);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);

  &.border {
    position: relative;
    background-color: var(--border-color);
    padding: var(--border-width);

    &::before {
      content: '';
      position: absolute;
      inset: var(--border-width);
      clip-path: inherit;
      background: var(--hive-background);
    }

    & > .content {
      position: relative;
      z-index: 0;
      height: 100%;
    }
  }

  &.vertical {
    width: calc(var(--width) / var(--sqrt-3) * 2);
    height: var(--width);
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  }
}`,x=s({title:"蜂巢(正六边形)样式",group:"effect",__name:"index",setup(h){function e(){console.log("click")}return(b,i)=>(d(),l("div",c,[i[4]||(i[4]=o("p",{class:"block"},[t(" 使用 CSS 的 "),o("code",null,"clip-path"),t(" 实现蜂巢（正六边形）样式，且点击区域与形状一致。但边框效果需靠伪元素实现，另外内部文本有裁剪问题。 ")],-1)),o("div",{class:"case"},[o("div",{class:"hive-item",onClick:e},i[0]||(i[0]=[o("div",{class:"content"}," 文字文字文字文字 ",-1)])),o("div",{class:"hive-item border",onClick:e},i[1]||(i[1]=[o("div",{class:"content"}," 文字文字文字文字 ",-1)]))]),o("div",{class:"case"},[o("div",{class:"hive-item vertical",onClick:e},i[2]||(i[2]=[o("div",{class:"content"}," 横向的 ",-1)])),o("div",{class:"hive-item vertical border",onClick:e},i[3]||(i[3]=[o("div",{class:"content"}," 横向的 ",-1)]))]),o("div",v,[a(n(r),{code:p,lang:"less"})]),i[5]||(i[5]=o("p",{class:"block"},[t(" 备注："),o("code",null,"shape-outside: polygon()"),t(" 对本身无效，其他元素在 "),o("code",null,"float"),t(" 时才会按此形状环绕。 ")],-1))]))}});export{x as default};
