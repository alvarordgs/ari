import api from "..";
import type { IRemedioDto } from "./hooks";

export const RemedioApi = {
  getRemedios: async () => {
    const { data } = await api.get<IRemedioResponse[]>("/remedio");
    return data;
  },
  createRemedio: async (remedio: IRemedioDto) => {
    const { data } = await api.post<IRemedioResponse>("/remedio", remedio);
    return data;
  },
};

export interface IRemedioResponse {
  id: number;
  nome: string;
  funcao: string;
  dosagem: number;
  status: boolean;
}
