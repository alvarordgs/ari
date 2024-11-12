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
  },
  getPrescricoesPorData: async (date: string | undefined) => {
    const { data } = await api.get<IPrescricaoResponse[]>(
      `/prescricao/pesquisar/data`,
      {
        params: {
          dataAtual: date,
        },
      }
    );
    return data;
  },
};

interface IPrescricaoResponse {
  id: number;
  observacao: string;
  remedio: IRemedioResponse;
  historico: IHistoricoResponse[];
  dt_inicio: Date;
  dt_fim: Date;
  frequencia: string;
  status: boolean;
}

export interface IHistoricoResponse {
  id: number;
  dt_atual: Date;
  status: boolean;
}
