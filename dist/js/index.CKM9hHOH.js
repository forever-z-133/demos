import"./index.vue_vue_type_style_index_0_lang.5rXx282V.js";import"./column.vue_vue_type_style_index_0_scoped_0163b564_lang.UHUi-yvq.js";import{_ as f}from"./index.vue_vue_type_script_setup_true_lang.CAFOZTCY.js";import{h as g,g as _,i as h,j as v,k as b,l as i,q as y,n as c,w as C,p as k,o as w,t as r}from"./vue.gVHh-qxJ.js";import"./index.DmD07DX5.js";import"./highlight.rmF5D-84.js";const x={class:"canvas-globalCompositeOperation"},O={class:"item"},E={class:"title"},S={class:"desc"},B=["data-key"],M=g({title:"globalCompositeOperation 知识整理",group:"others",layout:"pure",__name:"index",setup(N){const p=[{id:"source-over",desc:"默认。在目标图像上显示源图像。"},{id:"source-atop",desc:"在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。"},{id:"source-in",desc:"在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。"},{id:"source-out",desc:"在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。"},{id:"destination-over",desc:"在源图像上方显示目标图像。"},{id:"destination-atop",desc:"在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。"},{id:"destination-in",desc:"在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。"},{id:"destination-out",desc:"在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。"},{id:"lighter",desc:"显示源图像 + 目标图像。"},{id:"copy",desc:"显示源图像。忽略目标图像。"},{id:"xor",desc:"使用异或操作对源图像与目标图像进行组合。"}],a=_(1);h(()=>{d(),window.addEventListener("resize",d),u()}),v(()=>{window.removeEventListener("resize",d)});function d(){const s=window.innerWidth;s<768?a.value=1:s<992?a.value=2:s<1200?a.value=3:a.value=4}function u(){const s=document.querySelectorAll("canvas"),t=200,o=120;Array.from(s).forEach(n=>{n.width=t,n.height=o;const e=n.getContext("2d");if(!e)return;const l=t/2;e.fillStyle="rgba(0, 255, 0, .5)",e.fillRect(0,0,l,o);const m=n.dataset.key;e.globalCompositeOperation=m,e.fillStyle="rgba(255, 0, 0, 1)",e.beginPath(),e.arc(l,o/2,40,0,2*Math.PI),e.fill()})}return(s,t)=>(w(),b("div",x,[t[0]||(t[0]=i("p",{class:"block"}," Canvas 的图层模式，即 globalCompositeOperation 属性的应用。表现为覆盖时的遮挡或蒙版效果。 ",-1)),t[1]||(t[1]=i("p",{class:"block"},[c(" 先绘制 `rgba(0, 255, 0, .5)` 的淡绿色方块，再设置 "),i("code",null,"globalCompositeOperation"),c("，再绘制 `rgba(255, 0, 0, 1)` 的红色圆，最终效果如下： ")],-1)),y(k(f),{data:p,column:a.value,gap:[16,40]},{default:C(({row:o})=>[i("section",O,[i("div",E,r(o.id),1),i("div",S,r(o.desc),1),i("canvas",{"data-key":o.id},null,8,B)])]),_:1},8,["column"])]))}});export{M as default};
