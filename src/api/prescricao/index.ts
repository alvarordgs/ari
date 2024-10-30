import api from "..";
import type { IRemedioResponse } from "../remedio";
import type { IPrescricaoDto } from "./hooks";

export const PrescricaoApi = {
  getPrescricoes: async () => {
    const { data } = await api.get<IPrescricaoResponse[]>("/prescricao");
    return data;
  },
  createPrescricao: async (dto: IPrescricaoDto) => {
    const { data } = await api.post("/prescricao", dto);
    return data;
  }
};

interface IPrescricaoResponse {
  id: number;
  observacao: string;
  remedio: IRemedioResponse;
  frequencia: string;
  data_inicio: Date;
  data_fim: Date;
  status: boolean;
}
