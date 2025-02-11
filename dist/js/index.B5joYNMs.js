import{_ as r}from"./index.vue_vue_type_script_setup_true_lang.Dvam-HbT.js";import"./index.vue_vue_type_style_index_0_lang.C7RIy2qt.js";import"./column.vue_vue_type_style_index_0_scoped_0163b564_lang.UHUi-yvq.js";import{h as a,k as n,l as e,n as s,F as l,s as i,q as p,p as u,o as c,t as d}from"./vue.gVHh-qxJ.js";import"./index.BHcdEe5v.js";import"./highlight.rmF5D-84.js";const m={class:"pure-css-total-count"},_={class:"checkbox-list"},k={class:"label"},f={class:"block"},b=`.wrapper {
  counter-reset: name;
}
[type="checkbox"]:checked {
  counter-increment: name;
}
.output::after {
  content: counter(name);
}
`,N=a({title:"纯 CSS 实现 checkbox 勾选总数统计",group:"effect",__name:"index",setup(x){return(h,t)=>(c(),n("div",m,[t[1]||(t[1]=e("p",{class:"block"},[s(" 利用 CSS 的 "),e("code",null,"counter()"),s(" 特性实现 "),e("code",null,"checkbox"),s(" 的勾选总数统计。 ")],-1)),e("div",_,[(c(),n(l,null,i(4,o=>e("label",{key:o,class:"item"},[t[0]||(t[0]=e("input",{type:"checkbox"},null,-1)),e("span",k,"选项"+d(o),1)])),64))]),t[2]||(t[2]=e("div",{class:"output"}," 已勾选数量： ",-1)),e("div",f,[p(u(r),{code:b,lang:"less"})])]))}});export{N as default};
