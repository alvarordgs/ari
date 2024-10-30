import axios from "..";
import type { ILoginPayload } from "./hooks";

export const AuthApi = {
  login: async (payload: ILoginPayload) => {
    const { data } = await axios.post("/auth/login", payload);
    return data;
  },
  logout: async () => {
    const { data } = await axios.post("/auth/logout");
    return data;
  },
};
