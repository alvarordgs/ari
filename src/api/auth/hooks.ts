import { useMutation } from "@tanstack/react-query";
import { AuthApi } from ".";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: ILoginPayload) => AuthApi.login(payload),
  });
};

export interface ILoginPayload {
  email: string;
  senha: string;
}

export const useLogout = () => {
  return useMutation({
    mutationFn: () => AuthApi.logout(),
  });
};
