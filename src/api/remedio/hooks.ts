import { useMutation, useQuery } from "@tanstack/react-query";
import { RemedioApi } from ".";

export const useGetRemedios = () => {
  return useQuery({
    queryKey: ["remedios"],
    queryFn: () => RemedioApi.getRemedios(),
  });
};

export const useCreateRemedio = () => {
  return useMutation({
    mutationFn: (remedio: IRemedioDto) => RemedioApi.createRemedio(remedio),
  });
}

export interface IRemedioDto {
  nome: string;
  funcao: string;
  dosagem: number;
}
