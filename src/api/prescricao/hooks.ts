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

export interface IPrescricaoDto {
  observacao: string;
  id_remedio: number;
  frequencia: string;
  dt_inicio: Date;
  dt_fim: Date | null;
}
