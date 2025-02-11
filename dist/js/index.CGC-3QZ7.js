import{_ as s}from"./index.vue_vue_type_script_setup_true_lang.BFtrR6Ak.js";import"./index.vue_vue_type_style_index_0_lang.5rXx282V.js";import"./column.vue_vue_type_style_index_0_scoped_0163b564_lang.UHUi-yvq.js";import{h as c,g as a,k as r,l as i,t as f,q as l,p,o as d}from"./vue.gVHh-qxJ.js";import"./index.DmD07DX5.js";import"./highlight.rmF5D-84.js";const m={class:"Notification-api"},N={class:"block"},u={class:"block"},_=`function sendNotification() {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification')
    return
  }
  if (Notification.permission === 'granted') {
    const notification = new Notification('Hi there!', { body: 'body' })
    notification.onshow = console.log
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(sendNotification)
  }
}`,P=c({title:"浏览器通知 Notification API",group:"others",__name:"index",setup(h){const t=a(Notification.permission);function n(){if(t.value=Notification.permission,!("Notification"in window)){alert("This browser does not support desktop notification");return}if(Notification.permission==="granted"){const o=new Notification("Hi there!",{body:"body"});o.onerror=console.log,o.onclick=console.log,o.onshow=console.log,o.onclose=console.log}else Notification.permission!=="denied"&&Notification.requestPermission().then((...o)=>{console.log(...o),n()})}return(o,e)=>(d(),r("div",m,[e[0]||(e[0]=i("p",{class:"block"}," 浏览器的 Notification API。但好像不生效了。 ",-1)),i("p",N," 浏览器通知权限状态："+f(t.value),1),i("button",{class:"btn",onClick:n}," 发起通知 "),i("div",u,[l(p(s),{code:_,lang:"js"})])]))}});export{P as default};
