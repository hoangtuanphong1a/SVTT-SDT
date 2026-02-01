import{_ as H,u as L,f as w,h,r as i,o as d,c as a,a as n,w as l,b as e,d as o,t as m,F as S,e as J,i as q,g as R}from"./index-b90ad5c8.js";const z={class:"vuejs-topic-view"},A={class:"text-h4 mb-4"},E={key:0},F={key:1},M={class:"html"},O={id:"app"},W={key:0},$={key:2},G={__name:"VueJSTopicView",setup(K){const I=L(),b=w(I.params.topic),N=h(()=>[{text:"Trang chủ",disabled:!1,href:"/"},{text:"VueJS",disabled:!1,href:"/vuejs"},{text:V.value,disabled:!0}]),V=h(()=>{const u=k.value.find(t=>t.slug===b.value);return u?u.title:"Chủ đề VueJS"}),k=w([{title:"Tổng quan và thiết lập",slug:"overview-setup",icon:"mdi-information",iconColor:"primary"},{title:"Vue Instances và Template",slug:"instances-templates",icon:"mdi-code-tags",iconColor:"success"},{title:"Component",slug:"components",icon:"mdi-puzzle",iconColor:"info"},{title:"Computed và Watch",slug:"computed-watch",icon:"mdi-eye",iconColor:"warning"},{title:"Data Binding",slug:"data-binding",icon:"mdi-link",iconColor:"purple"},{title:"Event Handling",slug:"event-handling",icon:"mdi-gesture-tap",iconColor:"teal"},{title:"Rendering",slug:"rendering",icon:"mdi-view-dashboard",iconColor:"orange"},{title:"Transition và Animation",slug:"transitions-animations",icon:"mdi-animation",iconColor:"pink"},{title:"Directives và Routing",slug:"directives-routing",icon:"mdi-route",iconColor:"indigo"},{title:"Lifecycle Hooks",slug:"lifecycle-hooks",icon:"mdi-lifecycle",color:"cyan"}]);return(u,t)=>{const j=i("v-breadcrumbs"),r=i("v-icon"),C=i("v-col"),x=i("v-row"),B=i("v-card-title"),p=i("v-list-item-icon"),v=i("v-list-item-title"),c=i("v-list-item-content"),f=i("v-list-item"),T=i("v-list"),g=i("v-card-text"),_=i("v-card"),y=i("v-divider");return d(),a("div",z,[n(x,null,{default:l(()=>[n(C,{cols:"12"},{default:l(()=>[n(j,{items:N.value,class:"pa-0 mb-4"},null,8,["items"]),e("h1",A,[n(r,{left:""},{default:l(()=>[...t[1]||(t[1]=[o("mdi-vuejs",-1)])]),_:1}),o(" "+m(V.value),1)])]),_:1})]),_:1}),n(x,null,{default:l(()=>[n(C,{cols:"12",md:"4"},{default:l(()=>[n(_,{class:"topic-menu"},{default:l(()=>[n(B,{class:"text-h6"},{default:l(()=>[...t[2]||(t[2]=[o("Các chủ đề VueJS",-1)])]),_:1}),n(g,null,{default:l(()=>[n(T,{dense:""},{default:l(()=>[(d(!0),a(S,null,J(k.value,(s,D)=>(d(),R(f,{key:D,link:"",to:`/vuejs/${s.slug}`,active:s.slug===b.value},{default:l(()=>[n(p,null,{default:l(()=>[n(r,{color:s.iconColor},{default:l(()=>[o(m(s.icon),1)]),_:2},1032,["color"])]),_:2},1024),n(c,null,{default:l(()=>[n(v,null,{default:l(()=>[o(m(s.title),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["to","active"]))),128))]),_:1})]),_:1})]),_:1})]),_:1}),n(C,{cols:"12",md:"8"},{default:l(()=>[n(_,{class:"topic-content"},{default:l(()=>[n(g,null,{default:l(()=>[b.value==="overview-setup"?(d(),a("div",E,[t[12]||(t[12]=e("h2",{class:"text-h5 mb-4"},"Tổng quan và thiết lập",-1)),t[13]||(t[13]=e("p",{class:"mb-4"},"Chủ đề này giới thiệu tổng quan về VueJS và cách thiết lập môi trường phát triển.",-1)),n(y,{class:"my-4"}),t[14]||(t[14]=e("h3",{class:"text-h6 mb-3"},"VueJS là gì?",-1)),t[15]||(t[15]=e("p",{class:"mb-4"}," VueJS là framework JavaScript tiến bộ giúp xây dựng giao diện người dùng động. Nó được thiết kế từ dưới lên, tập trung vào lớp view và dễ dàng tích hợp với các dự án hiện có. ",-1)),n(y,{class:"my-4"}),t[16]||(t[16]=e("h3",{class:"text-h6 mb-3"},"Đặc điểm chính",-1)),n(T,null,{default:l(()=>[n(f,null,{default:l(()=>[n(p,null,{default:l(()=>[n(r,{color:"primary"},{default:l(()=>[...t[3]||(t[3]=[o("mdi-check",-1)])]),_:1})]),_:1}),n(c,null,{default:l(()=>[n(v,null,{default:l(()=>[...t[4]||(t[4]=[o("Dễ học và dễ sử dụng",-1)])]),_:1})]),_:1})]),_:1}),n(f,null,{default:l(()=>[n(p,null,{default:l(()=>[n(r,{color:"primary"},{default:l(()=>[...t[5]||(t[5]=[o("mdi-check",-1)])]),_:1})]),_:1}),n(c,null,{default:l(()=>[n(v,null,{default:l(()=>[...t[6]||(t[6]=[o("Hiệu suất cao với Virtual DOM",-1)])]),_:1})]),_:1})]),_:1}),n(f,null,{default:l(()=>[n(p,null,{default:l(()=>[n(r,{color:"primary"},{default:l(()=>[...t[7]||(t[7]=[o("mdi-check",-1)])]),_:1})]),_:1}),n(c,null,{default:l(()=>[n(v,null,{default:l(()=>[...t[8]||(t[8]=[o("Linh hoạt và dễ tích hợp",-1)])]),_:1})]),_:1})]),_:1}),n(f,null,{default:l(()=>[n(p,null,{default:l(()=>[n(r,{color:"primary"},{default:l(()=>[...t[9]||(t[9]=[o("mdi-check",-1)])]),_:1})]),_:1}),n(c,null,{default:l(()=>[n(v,null,{default:l(()=>[...t[10]||(t[10]=[o("Hệ sinh thái phong phú",-1)])]),_:1})]),_:1})]),_:1})]),_:1}),n(y,{class:"my-4"}),t[17]||(t[17]=e("h3",{class:"text-h6 mb-3"},"Cài đặt VueJS",-1)),n(_,{class:"code-example"},{default:l(()=>[n(g,null,{default:l(()=>[...t[11]||(t[11]=[e("pre",null,[e("code",{class:"bash"},`
# Cài đặt Vue CLI
npm install -g @vue/cli

# Tạo dự án mới
vue create my-vue-app

# Chạy dự án
cd my-vue-app
npm run serve
                  `)],-1)])]),_:1})]),_:1})])):b.value==="instances-templates"?(d(),a("div",F,[t[29]||(t[29]=e("h2",{class:"text-h5 mb-4"},"Vue Instances và Template",-1)),t[30]||(t[30]=e("p",{class:"mb-4"},"Chủ đề này giới thiệu về Vue instances và cách làm việc với template.",-1)),n(y,{class:"my-4"}),t[31]||(t[31]=e("h3",{class:"text-h6 mb-3"},"Vue Instance cơ bản",-1)),n(_,{class:"code-example"},{default:l(()=>[n(g,null,{default:l(()=>[...t[18]||(t[18]=[e("pre",null,[e("code",{class:"javascript"},`
// Tạo Vue instance
const app = Vue.createApp({
  data() {
    return {
      message: 'Hello Vue!',
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})

// Mount ứng dụng
app.mount('#app')
                  `)],-1)])]),_:1})]),_:1}),n(y,{class:"my-4"}),t[32]||(t[32]=e("h3",{class:"text-h6 mb-3"},"Template syntax",-1)),n(_,{class:"code-example"},{default:l(()=>[n(g,null,{default:l(()=>[e("pre",null,[e("code",M,[t[27]||(t[27]=o(`
`,-1)),e("div",O,[t[21]||(t[21]=o(`
  `,-1)),e("h1",null,m(u.message),1),t[22]||(t[22]=o(`
  `,-1)),e("p",null,"Count: "+m(u.count),1),t[23]||(t[23]=o(`
  `,-1)),e("button",{onClick:t[0]||(t[0]=(...s)=>u.increment&&u.increment(...s))},"Increment"),t[24]||(t[24]=o(`

  
  `,-1)),u.count>5?(d(),a("p",W,"Count is greater than 5!")):q("",!0),t[25]||(t[25]=o(`
  `,-1)),e("ul",null,[t[19]||(t[19]=o(`
    `,-1)),(d(!0),a(S,null,J(u.items,s=>(d(),a("li",{key:s.id},`
      `+m(s.name)+`
    `,1))),128)),t[20]||(t[20]=o(`
  `,-1))]),t[26]||(t[26]=o(`
`,-1))]),t[28]||(t[28]=o(`
                  `,-1))])])]),_:1})]),_:1})])):(d(),a("div",$,[...t[33]||(t[33]=[e("h2",{class:"text-h5 mb-4"},"Nội dung chủ đề",-1),e("p",null,"Đang cập nhật nội dung chi tiết cho chủ đề này...",-1)])]))]),_:1})]),_:1})]),_:1})]),_:1})])}}},Q=H(G,[["__scopeId","data-v-238b61dc"]]);export{Q as default};
//# sourceMappingURL=VueJSTopicView-658d3602.js.map
