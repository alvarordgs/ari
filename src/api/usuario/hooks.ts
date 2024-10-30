import { useMutation } from "@tanstack/react-query";
import { UserApi } from ".";

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: IRegisterPayload) => UserApi.register(payload),
  });
};

export interface IRegisterPayload {
  nome: string;
  email: string;
  senha: string;
}
