import { z } from 'zod';

export const questionSchema = z.object({
  question: z.string().min(1, "La pregunta es obligatoria"),
  answer: z.string().min(1, "La respuesta es obligatoria"),
});