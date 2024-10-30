import axios from "..";
import type { IRemedioResponse } from "../remedio";
import type { IPrescricaoDto } from "./hooks";

export const PrescricaoApi = {
  getPrescricoes: async () => {
    const { data } = await axios.get<IPrescricaoResponse[]>("/prescricao");
    return data;
  },
  createPrescricao: async (dto: IPrescricaoDto) => {
    const { data } = await axios.post("/prescricao", dto);
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
