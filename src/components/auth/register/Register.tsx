import { useForm, type SubmitHandler } from "react-hook-form";
import type { RegisterFormSchema } from "./types";
import { registerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import ErrorsMessage from "@/commons/FormErrorsMessage";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/api/usuario/hooks";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { mutateAsync: createUser } = useRegister();

  const { toast } = useToast();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormSchema> = async (data) => {
    const { nome, email, senha } = data;

    try {
      await createUser({ nome, email, senha });

      toast({
        title: "Conta criada com sucesso",
        description: "Sua conta foi criada com sucesso, faça login!",
      });

      navigate("/");
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 401) {
        setError("email", {
          type: "manual",
          message: "Email ja existe",
        });
      } else {
        toast({
          title: "Erro ao criar conta",
          description: "Ocorreu um erro ao criar conta, tente novamente!",
        });
      }
    }
  };

  return (
    <section className="bg-gray-700">
      <div className="flex flex-col items-center justify-center px-6 py-6 gap-4 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-xl shadow md:mt-0 sm:max-w-xl xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Criar conta
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nome completo
                  </label>
                  <input
                    id="nome"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Fulano da Silva"
                    {...register("nome")}
                  />
                  {errors.nome?.message && (
                    <ErrorsMessage
                      message={errors.nome.message}
                      className="mt-1"
                    />
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Seu e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="nome@email.com"
                    {...register("email")}
                  />
                  {errors.email?.message && (
                    <ErrorsMessage
                      message={errors.email.message}
                      className="mt-1"
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                    {...register("senha")}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="rounded-md hover:text-green-300 p-2 text-xs transition-all ease-in-out text-green-400 font-medium absolute inset-y-0 end-1"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="flex gap-2">
                  {errors.senha?.message && (
                    <ErrorsMessage
                      message={errors.senha.message}
                      className="mt-1"
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirmar senha
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    {...register("confirmarSenha")}
                  />
                  {errors.confirmarSenha?.message && (
                    <ErrorsMessage
                      message={errors.confirmarSenha.message}
                      className="mt-1"
                    />
                  )}
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    type="button"
                    className="rounded-md hover:text-green-300 p-2 text-xs transition-all ease-in-out text-green-400 font-medium absolute inset-y-0 end-1"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <Button type="submit">Criar conta</Button>
              <p className="text-sm font-light text-gray-500 text-center">
                Você já tem uma conta?{" "}
                <Link
                  to={"/"}
                  className="font-medium text-primary-600 hover:underline"
                >
                  Entre aqui
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
