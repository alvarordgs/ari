import axios from "..";
import type { IRemedioDto } from "./hooks";

export const RemedioApi = {
  getRemedios: async () => {
    const { data } = await axios.get<IRemedioResponse[]>("/remedio");
    return data;
  },
  createRemedio: async (remedio: IRemedioDto) => {
    const { data } = await axios.post<IRemedioResponse>("/remedio", remedio);
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
