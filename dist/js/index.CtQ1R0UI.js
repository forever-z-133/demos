import{_ as o}from"./index.vue_vue_type_script_setup_true_lang.Dvam-HbT.js";import"./index.vue_vue_type_style_index_0_lang.C7RIy2qt.js";import"./column.vue_vue_type_style_index_0_scoped_0163b564_lang.UHUi-yvq.js";import{h as i,k as a,l as e,n as t,F as c,s as d,q as p,p as m,o as l,v as g}from"./vue.gVHh-qxJ.js";import"./index.BHcdEe5v.js";import"./highlight.rmF5D-84.js";const _={class:"css-3d-pillar"},f={class:"case"},u={class:"pillar-container"},h={class:"pillar-list"},v={class:"block"},k=`.pillar-container {
  transform-style: preserve-3d;
  transform: rotateX(-5deg);
}
.pillar-list {
  transform-style: preserve-3d;
  animation: rotate 5s linear infinite;
}
@length: 8;
.item {
  each(range(@length), {
    @deg: (360deg / @length * @value);
    @r: (460px / (2 * sin((pi() * (@length - 2)) / (2 * @length))));
    &:nth-child(@{value}) {
      transform: rotateY(@deg) translateZ(@r);
    }
  })
}
@keyframes rotate {
  to { transform: rotateY(360deg); }
}`,D=i({title:"CSS 实现 3D 桶状效果",group:"effect",__name:"index",setup(y){const n=["red","grey","blue","green","yellow","pink","lightblue","lightgreen"];return(b,s)=>(l(),a("div",_,[s[0]||(s[0]=e("p",{class:"block"},[t(" 使用 CSS 的 "),e("code",null,"preserve-3d"),t(" 和 "),e("code",null,"transform"),t(" 实现 3D 桶状效果 ")],-1)),e("div",f,[e("div",u,[e("div",h,[(l(),a(c,null,d(n,r=>e("div",{key:r,class:"item"},[e("div",{class:"content",style:g({background:r})},null,4)])),64))])])]),e("div",v,[p(m(o),{code:k,lang:"less"})])]))}});export{D as default};
