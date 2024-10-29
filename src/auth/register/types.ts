import type { z } from "zod";
import type { registerFormSchema } from "./schema";

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
