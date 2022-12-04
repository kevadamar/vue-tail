import { getListCharges } from "@/services/chargeServices";

export const chargeStore = {
  namespaced: true,
  state: () => ({
    allCharge: [
      // default object in array
      //       {
      //         code: 1,
      //         label: "Stuffing",
      //       },
    ],
    isError: null,
  }),
  mutations: {
    SET_CHARGES(state, allCharge) {
      state.allCharge = allCharge.map((Charge) => ({
        code: Charge.id,
        label: Charge.value,
        data: Charge,
      }));
    },
    SET_ERROR(state, isError) {
      state.isError = isError;
    },
  },
  actions: {
    async getListCharges({ commit }) {
      const result = await getListCharges();
      if (result.error) {
        commit("SET_ERROR", result.error);
      } else {
        commit("SET_CHARGES", result.data);
      }
    },
  },
};
