import { getListUOM } from "@/services/uomServices";

export const uomStore = {
  namespaced: true,
  state: () => ({
    allUom: [
      // default object in array
      // {
      //   code: 1,
      //   label: "SHP",
      // },
    ],
    isError: null,
  }),
  mutations: {
    SET_UOMS(state, allUom) {
      state.allUom = allUom.map((uom) => ({
        code: uom.id,
        label: uom.value,
        data: uom,
      }));
    },
    SET_ERROR(state, isError) {
      state.isError = isError;
    },
  },
  actions: {
    async getListUom({ commit }) {
      const result = await getListUOM();
      if (result.error) {
        commit("SET_ERROR", result.error);
      } else {
        commit("SET_UOMS", result.data);
      }
    },
  },
};
