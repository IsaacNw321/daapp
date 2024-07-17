import {z} from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);


export const userSchema = z.object({
  firstName: z.string()
    .min(3, { message: 'El nombre debe tener mas de 3 letras' })
    .max(20, { message: 'El nombre es muy largo' })
    .refine(value => isNaN(Number(value)), {
      message: 'El nombre no pueden ser numeros',
      path: ['firstName']
    }),
  lastName: z.string()
    .min(3, { message: 'El apellido debe tener mas de 3 letras' })
    .max(20, { message: 'El apellido es muy largo' })
    .refine(value => isNaN(Number(value)), {
      message: 'El apellido no pueden ser numeros',
      path: ['lastName']
    }),
  email: z.string().email({ message: 'Ingresa un correo autentico ejemplo : ejemplo@gmail.com' }),
})

export const reviewSchema = z.object({
  content: z.string()
    .min(30, { message: 'El Comentario debe tener mas de 30 caracteres' })
    .max(90, { message: 'El Comentario es muy largo, podrias por favor resumirlo un poco mas?' })
    .refine(value => isNaN(Number(value)), {
      message: 'El comentario no pueden ser numeros',
      path: ['content']
    }),
})

export const roleSchema = z.string().refine(value => {
  return ["CONTACT", "DANCER", "REPRESENTATIVE"].includes(value);
}, {
  message: 'Rol invalido',
  path: ['userRole']
});
