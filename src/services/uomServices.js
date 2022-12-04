import { UOM_LIST } from "@/utils/apiList";
import { API } from "@/utils/axios";

export const getListUOM = async () => {
  try {
    const response = await API.get(UOM_LIST);
    return { error: false, status: 200, data: response.data.data };
  } catch (error) {
    return { error, status: error.response.status, data: null };
  }
};
