import api from "..";
import type { IRemedioDto } from "./hooks";

export const RemedioApi = {
  getRemedios: async (status: boolean) => {
    const { data } = await api.get<IRemedioResponse[]>("/remedio", {
      params: {
        status,
      },
    });
    return data;
  },
  createRemedio: async (remedio: IRemedioDto) => {
    const { data } = await api.post<IRemedioResponse>("/remedio", remedio);
    return data;
  },
  editRemedio: async (idRemedio: number, remedio: IRemedioDto) => {
    const { data } = await api.patch<IRemedioResponse>(
      `/remedio/${idRemedio}`,
      remedio
    );
    return data;
  },
  deleteRemedio: async (idRemedio: number) => {
    const { data } = await api.delete<number>(`/remedio/${idRemedio}`);
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
