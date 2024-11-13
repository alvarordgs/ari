import { useMutation, useQuery } from "@tanstack/react-query";
import { PrescricaoApi } from ".";

export const useGetPrescricoes = () => {
  return useQuery({
    queryKey: ["prescricoes"],
    queryFn: () => PrescricaoApi.getPrescricoes(),
  });
};

export const useGetPrescricaoById = (prescricaoId: number) => {
  return useQuery({
    queryKey: ["prescricoes", prescricaoId],
    queryFn: () => PrescricaoApi.getPrescricaoById(prescricaoId),
  });
};

export const useCreatePrescricao = () => {
  return useMutation({
    mutationFn: (dto: IPrescricaoDto) => PrescricaoApi.createPrescricao(dto),
  });
};

export const useGetPrescricoesPorData = (date: string | undefined) => {
  return useQuery({
    queryKey: ["prescricoes-por-data", date],
    queryFn: () => PrescricaoApi.getPrescricoesPorData(date),
    enabled: !!date,
  });
};

export const useEditPrescricao = () => {
  return useMutation({
    mutationFn: ({
      idPrescricao,
      dto,
    }: {
      idPrescricao: number;
      dto: IPrescricaoDto;
    }) => PrescricaoApi.editPrescricao(idPrescricao, dto),
  });
};

export const useDeletePrescricao = () => {
  return useMutation({
    mutationFn: (idPrescricao: number) =>
      PrescricaoApi.deletePrescricao(idPrescricao),
  });
}

export interface IPrescricaoDto {
  observacao: string;
  id_remedio: number;
  frequencia: number;
  dt_inicio: Date;
  dt_fim: Date | null;
}
