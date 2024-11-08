import { useMutation, useQuery } from "@tanstack/react-query";
import { PrescricaoApi } from ".";

export const useGetPrescricoes = () => {
  return useQuery({
    queryKey: ["prescricoes"],
    queryFn: () => PrescricaoApi.getPrescricoes(),
  });
};

export const useCreatePrescricao = () => {
  return useMutation({
    mutationFn: (dto: IPrescricaoDto) => PrescricaoApi.createPrescricao(dto),
  })
}

export const useGetPrescricoesPorData = (date: string | undefined) => {
  return useQuery({
    queryKey: ["prescricoes-por-data", date],
    queryFn: () => PrescricaoApi.getPrescricoesPorData(date),
    enabled: !!date,
  })
}

export interface IPrescricaoDto {
  observacao: string;
  id_remedio: number;
  frequencia: number;
  dt_inicio: Date;
  dt_fim: Date | null;
}
