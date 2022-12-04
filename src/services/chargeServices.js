import { CHARGES_LIST } from "@/utils/apiList";
import { API } from "@/utils/axios";

export const getListCharges = async () => {
  try {
    const response = await API.get(CHARGES_LIST);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};
