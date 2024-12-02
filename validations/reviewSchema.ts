import {z} from 'zod';
export const reviewSchema = z.object({
  content: z.string()
    .min(30, { message: 'El Comentario debe tener mas de 30 caracteres' })
    .max(90, { message: 'El Comentario es muy largo, podrias por favor resumirlo un poco mas?' })
    .refine(value => isNaN(Number(value)), {
      message: 'El comentario no pueden ser numeros',
      path: ['content']
    }),
})
