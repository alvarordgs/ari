import { useMutation, useQuery } from "@tanstack/react-query";
import { UserApi } from ".";

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: IRegisterPayload) => UserApi.register(payload),
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => UserApi.getMe(),
  });
}

export interface IRegisterPayload {
  nome: string;
  email: string;
  senha: string;
}
