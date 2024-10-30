import axios from "axios";
import type { IRegisterPayload } from "./hooks";

export const UserApi = {
  register: async (payload: IRegisterPayload) => {
    const { data } = await axios.post("/usuario", payload);
    return data;
  },
}