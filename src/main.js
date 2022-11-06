import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import storage from "./utils/storage";

Vue.config.productionTip = false;
Vue.prototype.$storage = storage; //全局storage
Vue.use(ElementUI);

new Vue({
  render: (h) => h(App)
}).$mount("#app");
