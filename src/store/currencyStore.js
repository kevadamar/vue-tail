import { getListCurrency } from "@/services/currencyServices";

export const currencyStore = {
  namespaced: true,
  state: () => ({
    allCurrency: [
      // default object in array
      //       {
      //         code: 1,
      //         label: "USD",
      //    },
    ],
    isError: null,
  }),
  mutations: {
    SET_CURRENCY(state, allCurrency) {
      state.allCurrency = allCurrency.map((currency) => ({
        code: currency.id,
        label: currency.value,
        data: currency,
      }));
    },
    SET_ERROR(state, isError) {
      state.isError = isError;
    },
  },
  actions: {
    async getListCurrency({ commit }) {
      const result = await getListCurrency();
      if (result.error) {
        commit("SET_ERROR", result.error);
      } else {
        commit("SET_CURRENCY", result.data);
      }
    },
  },
};
