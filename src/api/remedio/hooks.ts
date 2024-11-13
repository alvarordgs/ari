import { useMutation, useQuery } from "@tanstack/react-query";
import { RemedioApi } from ".";

export const useGetRemedios = (status: boolean) => {
  return useQuery({
    queryKey: ["remedios"],
    queryFn: () => RemedioApi.getRemedios(status),
  });
};

export const useCreateRemedio = () => {
  return useMutation({
    mutationFn: (remedio: IRemedioDto) => RemedioApi.createRemedio(remedio),
  });
};

export const useEditRemedio = () => {
  return useMutation({
    mutationFn: ({
      idRemedio,
      remedio,
    }: {
      idRemedio: number;
      remedio: IRemedioDto;
    }) => RemedioApi.editRemedio(idRemedio, remedio),
  });
};

export const useDeleteRemedio = () => {
  return useMutation({
    mutationFn: (idRemedio: number) => RemedioApi.deleteRemedio(idRemedio),
  });
}

export interface IRemedioDto {
  nome: string;
  funcao: string;
  dosagem: number;
}
