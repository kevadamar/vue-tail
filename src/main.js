import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./index.css";
import "vue-select/dist/vue-select.css";
import { extend, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import vSelect from "vue-select";

// config component Global
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("v-select", vSelect);

extend("required", {
  ...required,
  message: "This field is required",
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
