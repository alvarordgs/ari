import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerFormSchema } from "./schema";
import type { RegisterFormSchemaType } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useRegister } from "@/api/auth/hooks";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutateAsync: handleRegister, isPending } = useRegister();
  const { toast } = useToast();

  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: RegisterFormSchemaType) => {
    try {
      await handleRegister(data);
      toast({
        title: "Cadastro efetuado com sucesso",
        description: "Bem-vindo ao sistema!",
      });
    } catch (error: unknown) {
      toast({
        title: "Erro ao fazer cadastro",
        description: "Verifique os campos e tente novamente.",
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-4xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row w-full">
          <div className="md:w-1/2 bg-blue-600 text-white flex items-center justify-center p-8 rounded-l-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Junte-se a nós!</h2>
              <p className="text-blue-100">
                Crie sua conta e comece a gerenciar seus projetos hoje mesmo.
              </p>
            </div>
          </div>

          <div className="md:w-1/2 p-8 bg-white">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold">Cadastro</CardTitle>
              <CardDescription>
                Preencha os campos abaixo para criar sua conta
              </CardDescription>
            </CardHeader>
            <form onSubmit={() => handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nome
                  </Label>
                  <div className="relative">
                    <UserIcon
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      {...form.register("name")}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <MailIcon
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...form.register("email")}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Senha
                  </Label>
                  <div className="relative">
                    <LockIcon
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...form.register("password")}
                      className="pl-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Esconder senha" : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirmar Senha
                  </Label>
                  <div className="relative">
                    <LockIcon
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      {...form.register("confirmPassword")}
                      className="pl-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword
                          ? "Esconder confirmação de senha"
                          : "Mostrar confirmação de senha"}
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </CardFooter>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link to="/" className="text-blue-600 hover:underline">
                  Faça login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
