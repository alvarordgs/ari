import { z } from "zod";
import type { loginFormSchema } from "./schema";

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;