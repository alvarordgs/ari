import { useMutation } from "@tanstack/react-query";
import { AuthApi } from ".";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: ILoginPayload) => AuthApi.login(payload),
  });
};

export interface ILoginPayload {
  email: string;
  password: string;
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: IRegisterPayload) => AuthApi.register(payload),
  });
};

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}
