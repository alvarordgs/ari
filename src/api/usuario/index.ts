import api from "..";
import type { IRegisterPayload } from "./hooks";

export const UserApi = {
  register: async (payload: IRegisterPayload) => {
    const { data } = await api.post("/usuario", payload);
    return data;
  },
  getMe: async () => {
    const { data } = await api.get<IUsuarioResponse>("/usuario/me/data");
    return data;
  },
};

interface IUsuarioResponse {
  nome: string;
  email: string;
  dt_nascimento: Date;
  status: boolean;
}
