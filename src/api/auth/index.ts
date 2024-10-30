import api from "..";
import type { ILoginPayload } from "./hooks";

export const AuthApi = {
  login: async (payload: ILoginPayload) => {
    const { data } = await api.post("/auth/login", payload);
    return data;
  },
  logout: async () => {
    const { data } = await api.post("/auth/logout");
    return data;
  },
};
