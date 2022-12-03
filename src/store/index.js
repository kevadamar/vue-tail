import Vue from "vue";
import Vuex from "vuex";
import { chargeStore } from "./chargeStore";
import { currencyStore } from "./currencyStore";
import { uomStore } from "./uomStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { isLoadng: false },
  getters: {},
  mutations: {},
  actions: {},
  modules: { uom: uomStore, currency: currencyStore, charges: chargeStore },
});
