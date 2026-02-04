import "./assets/css/style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import VueApexCharts from "vue3-apexcharts";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
library.add(fas);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(pinia);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(VueApexCharts);
app.mount("#app");
