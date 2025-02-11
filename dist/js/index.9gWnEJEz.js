import{_ as n}from"./index.vue_vue_type_script_setup_true_lang.Dvam-HbT.js";import"./index.vue_vue_type_style_index_0_lang.C7RIy2qt.js";import"./column.vue_vue_type_style_index_0_scoped_0163b564_lang.UHUi-yvq.js";import{h as a,k as i,y as o,l as s,q as t,p,n as l,o as c}from"./vue.gVHh-qxJ.js";import"./index.BHcdEe5v.js";import"./highlight.rmF5D-84.js";const r={class:"pure-css-number-list-style"},u={class:"block"},d=`ul {
  counter-reset: name;
}
li::before {
  content: counter(name, '-') '. ';
  counter-increment: name;
}`,N=a({title:"多层级的数字 list-style 效果",group:"effect",__name:"index",setup(m){return(f,e)=>(c(),i("div",r,[e[0]||(e[0]=o('<p class="block"> 使用 CSS 的 <code>counter()</code> 特性，实现多层级的数字 <code>list-style</code> 效果。 </p><div class="case"><ul><li><span>我是王小二</span><ul><li><span>我是王小二的大儿子</span></li><li><span>我是王小二的二儿子</span><ul><li><span>我是王小二的二儿子的大孙子</span></li><li><span>我是王小二的二儿子的二孙子</span></li><li><span>我是王小二的二儿子的小孙子</span></li></ul></li><li><span>我是王小二的三儿子</span></li></ul></li><li><span>我是王小三</span></li><li><span>我是王小四</span><ul><li><span>我是王小四的大儿子</span></li></ul></li></ul></div>',2)),s("div",u,[t(p(n),{code:d,lang:"less"})]),e[1]||(e[1]=s("p",{class:"block"},[l(" 备注：若使用了 "),s("code",null,"display: flex"),l(" 和 "),s("code",null,"order"),l(" 来改变 "),s("code",null,"li"),l(" 顺序，但不会影响计数顺序。 ")],-1))]))}});export{N as default};
