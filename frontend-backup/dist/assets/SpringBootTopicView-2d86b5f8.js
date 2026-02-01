import{_ as E,u as H,f as V,h as j,r as e,o as u,c as v,a as t,w as l,b as s,d as o,t as k,F as J,e as Q,g as U}from"./index-b90ad5c8.js";const X={class:"spring-boot-topic-view"},$={class:"text-h4 mb-4"},z={key:0},G={key:1},K={class:"xml"},Y={key:2},Z={__name:"SpringBootTopicView",setup(h){const N=H(),g=V(N.params.topic),A=j(()=>[{text:"Trang chủ",disabled:!1,href:"/"},{text:"Spring Boot",disabled:!1,href:"/spring-boot"},{text:S.value,disabled:!0}]),S=j(()=>{const c=B.value.find(n=>n.slug===g.value);return c?c.title:"Chủ đề Spring Boot"}),B=V([{title:"Tổng quan Spring Boot",slug:"overview",icon:"mdi-information",iconColor:"primary"},{title:"Maven Web Application",slug:"maven-web-app",icon:"mdi-maven",iconColor:"success"},{title:"Ứng dụng CRUD",slug:"crud-application",icon:"mdi-database",iconColor:"info"},{title:"Web Service",slug:"web-services",icon:"mdi-web",iconColor:"warning"},{title:"Microservices",slug:"microservices",icon:"mdi-microchip",iconColor:"purple"},{title:"Dự án hoàn chỉnh",slug:"complete-project",icon:"mdi-check-all",iconColor:"teal"}]);return(c,n)=>{const I=e("v-breadcrumbs"),i=e("v-icon"),x=e("v-col"),C=e("v-row"),q=e("v-card-title"),r=e("v-list-item-icon"),d=e("v-list-item-title"),p=e("v-list-item-content"),a=e("v-list-item"),T=e("v-list"),f=e("v-card-text"),_=e("v-card"),b=e("v-divider"),D=e("modelVersion"),y=e("groupId"),w=e("artifactId"),M=e("version"),F=e("packaging"),L=e("parent"),O=e("dependency"),P=e("dependencies"),W=e("project");return u(),v("div",X,[t(C,null,{default:l(()=>[t(x,{cols:"12"},{default:l(()=>[t(I,{items:A.value,class:"pa-0 mb-4"},null,8,["items"]),s("h1",$,[t(i,{left:""},{default:l(()=>[...n[0]||(n[0]=[o("mdi-spring",-1)])]),_:1}),o(" "+k(S.value),1)])]),_:1})]),_:1}),t(C,null,{default:l(()=>[t(x,{cols:"12",md:"4"},{default:l(()=>[t(_,{class:"topic-menu"},{default:l(()=>[t(q,{class:"text-h6"},{default:l(()=>[...n[1]||(n[1]=[o("Các chủ đề Spring Boot",-1)])]),_:1}),t(f,null,{default:l(()=>[t(T,{dense:""},{default:l(()=>[(u(!0),v(J,null,Q(B.value,(m,R)=>(u(),U(a,{key:R,link:"",to:`/spring-boot/${m.slug}`,active:m.slug===g.value},{default:l(()=>[t(r,null,{default:l(()=>[t(i,{color:m.iconColor},{default:l(()=>[o(k(m.icon),1)]),_:2},1032,["color"])]),_:2},1024),t(p,null,{default:l(()=>[t(d,null,{default:l(()=>[o(k(m.title),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["to","active"]))),128))]),_:1})]),_:1})]),_:1})]),_:1}),t(x,{cols:"12",md:"8"},{default:l(()=>[t(_,{class:"topic-content"},{default:l(()=>[t(f,null,{default:l(()=>[g.value==="overview"?(u(),v("div",z,[n[10]||(n[10]=s("h2",{class:"text-h5 mb-4"},"Tổng quan Spring Boot",-1)),n[11]||(n[11]=s("p",{class:"mb-4"},"Chủ đề này giới thiệu tổng quan về Spring Boot và các khái niệm cơ bản.",-1)),t(b,{class:"my-4"}),n[12]||(n[12]=s("h3",{class:"text-h6 mb-3"},"Spring Boot là gì?",-1)),n[13]||(n[13]=s("p",{class:"mb-4"}," Spring Boot là framework giúp đơn giản hóa quá trình phát triển ứng dụng Spring. Nó cung cấp cách tiếp cận nhanh chóng để thiết lập và chạy ứng dụng Spring với cấu hình tối thiểu. ",-1)),t(b,{class:"my-4"}),n[14]||(n[14]=s("h3",{class:"text-h6 mb-3"},"Đặc điểm chính",-1)),t(T,null,{default:l(()=>[t(a,null,{default:l(()=>[t(r,null,{default:l(()=>[t(i,{color:"primary"},{default:l(()=>[...n[2]||(n[2]=[o("mdi-check",-1)])]),_:1})]),_:1}),t(p,null,{default:l(()=>[t(d,null,{default:l(()=>[...n[3]||(n[3]=[o("Cấu hình tự động",-1)])]),_:1})]),_:1})]),_:1}),t(a,null,{default:l(()=>[t(r,null,{default:l(()=>[t(i,{color:"primary"},{default:l(()=>[...n[4]||(n[4]=[o("mdi-check",-1)])]),_:1})]),_:1}),t(p,null,{default:l(()=>[t(d,null,{default:l(()=>[...n[5]||(n[5]=[o("Nhúng server (Tomcat, Jetty)",-1)])]),_:1})]),_:1})]),_:1}),t(a,null,{default:l(()=>[t(r,null,{default:l(()=>[t(i,{color:"primary"},{default:l(()=>[...n[6]||(n[6]=[o("mdi-check",-1)])]),_:1})]),_:1}),t(p,null,{default:l(()=>[t(d,null,{default:l(()=>[...n[7]||(n[7]=[o("Quản lý dependency dễ dàng",-1)])]),_:1})]),_:1})]),_:1}),t(a,null,{default:l(()=>[t(r,null,{default:l(()=>[t(i,{color:"primary"},{default:l(()=>[...n[8]||(n[8]=[o("mdi-check",-1)])]),_:1})]),_:1}),t(p,null,{default:l(()=>[t(d,null,{default:l(()=>[...n[9]||(n[9]=[o("Tích hợp sẵn nhiều công nghệ",-1)])]),_:1})]),_:1})]),_:1})]),_:1})])):g.value==="maven-web-app"?(u(),v("div",G,[n[45]||(n[45]=s("h2",{class:"text-h5 mb-4"},"Maven Web Application",-1)),n[46]||(n[46]=s("p",{class:"mb-4"},"Chủ đề này hướng dẫn cách tạo và cấu hình ứng dụng web với Maven.",-1)),t(b,{class:"my-4"}),n[47]||(n[47]=s("h3",{class:"text-h6 mb-3"},"Cấu trúc dự án Maven",-1)),t(_,{class:"code-example"},{default:l(()=>[t(f,null,{default:l(()=>[...n[15]||(n[15]=[s("pre",null,[s("code",{class:"bash"},`
my-spring-boot-app/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── MyAppApplication.java
│   │   ├── resources/
│   │   │   ├── application.properties
│   │   │   └── static/
│   │   │   └── templates/
│   └── test/
│       └── java/
├── pom.xml
                  `)],-1)])]),_:1})]),_:1}),t(b,{class:"my-4"}),n[48]||(n[48]=s("h3",{class:"text-h6 mb-3"},"File pom.xml mẫu",-1)),t(_,{class:"code-example"},{default:l(()=>[t(f,null,{default:l(()=>[s("pre",null,[s("code",K,[n[43]||(n[43]=o(`
`,-1)),t(W,{xmlns:"http://maven.apache.org/POM/4.0.0","xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation":`http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd`},{default:l(()=>[n[35]||(n[35]=o(`
    `,-1)),t(D,null,{default:l(()=>[...n[16]||(n[16]=[o("4.0.0",-1)])]),_:1}),n[36]||(n[36]=o(`

    `,-1)),t(y,null,{default:l(()=>[...n[17]||(n[17]=[o("com.example",-1)])]),_:1}),n[37]||(n[37]=o(`
    `,-1)),t(w,null,{default:l(()=>[...n[18]||(n[18]=[o("my-spring-boot-app",-1)])]),_:1}),n[38]||(n[38]=o(`
    `,-1)),t(M,null,{default:l(()=>[...n[19]||(n[19]=[o("0.0.1-SNAPSHOT",-1)])]),_:1}),n[39]||(n[39]=o(`
    `,-1)),t(F,null,{default:l(()=>[...n[20]||(n[20]=[o("jar",-1)])]),_:1}),n[40]||(n[40]=o(`

    `,-1)),t(L,null,{default:l(()=>[n[24]||(n[24]=o(`
        `,-1)),t(y,null,{default:l(()=>[...n[21]||(n[21]=[o("org.springframework.boot",-1)])]),_:1}),n[25]||(n[25]=o(`
        `,-1)),t(w,null,{default:l(()=>[...n[22]||(n[22]=[o("spring-boot-starter-parent",-1)])]),_:1}),n[26]||(n[26]=o(`
        `,-1)),t(M,null,{default:l(()=>[...n[23]||(n[23]=[o("3.1.0",-1)])]),_:1}),n[27]||(n[27]=o(`
    `,-1))]),_:1}),n[41]||(n[41]=o(`

    `,-1)),t(P,null,{default:l(()=>[n[33]||(n[33]=o(`
        `,-1)),t(O,null,{default:l(()=>[n[30]||(n[30]=o(`
            `,-1)),t(y,null,{default:l(()=>[...n[28]||(n[28]=[o("org.springframework.boot",-1)])]),_:1}),n[31]||(n[31]=o(`
            `,-1)),t(w,null,{default:l(()=>[...n[29]||(n[29]=[o("spring-boot-starter-web",-1)])]),_:1}),n[32]||(n[32]=o(`
        `,-1))]),_:1}),n[34]||(n[34]=o(`
    `,-1))]),_:1}),n[42]||(n[42]=o(`
`,-1))]),_:1}),n[44]||(n[44]=o(`
                  `,-1))])])]),_:1})]),_:1})])):(u(),v("div",Y,[...n[49]||(n[49]=[s("h2",{class:"text-h5 mb-4"},"Nội dung chủ đề",-1),s("p",null,"Đang cập nhật nội dung chi tiết cho chủ đề này...",-1)])]))]),_:1})]),_:1})]),_:1})]),_:1})])}}},tn=E(Z,[["__scopeId","data-v-49990cb5"]]);export{tn as default};
//# sourceMappingURL=SpringBootTopicView-2d86b5f8.js.map
