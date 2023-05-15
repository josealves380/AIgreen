import { z } from "zod";

export const userBody = z.object({
  body: z.object({
    name: z.string().min(8, "precisa ter 6 caracteres"),
    email: z.string().email("Precisa ser válido"),
    senha: z.string(), 
    nivel: z.string(),             
  })
})