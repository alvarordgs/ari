import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "O campo e-mail é obrigatório!" })
    .email({ message: "Email inválido" }),
  password: z.string({ required_error: "O campo senha é obrigatório!" }).min(8),
});
