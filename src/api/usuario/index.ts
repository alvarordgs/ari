
import api from "..";
import type { IRegisterPayload } from "./hooks";

export const UserApi = {
  register: async (payload: IRegisterPayload) => {
    const { data } = await api.post("/usuario", payload);
    return data;
  },
}