import axios from "..";
import type { ILoginPayload, IRegisterPayload } from "./hooks";

export const AuthApi = {
  login: async (payload: ILoginPayload) => {
    const { data } = await axios.post("/api/auth/login", payload);
    return data;
  },
  register: async (payload: IRegisterPayload) => {
    const { data } = await axios.post("/api/auth/register", payload);
    return data;
  },
};
