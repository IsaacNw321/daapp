import {z} from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);


export const userSchema = z.object({
  firstName: z.string()
  
    .min(3, { message: 'El nombre debe tener más de 3 letras' })
    .max(20, { message: 'El nombre es muy largo' })
    .refine(value => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(value), {
      message:  'El nombre solo puede contener letras, espacios, guiones y apóstrofes', path: ['firstName'] }),
  lastName: z.string()
    .min(3, { message: 'El apellido debe tener más de 3 letras' })
    .max(20, { message: 'El apellido es muy largo' })
    .refine(value => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(value), {
      message:  'El apellido solo puede contener letras, espacios, guiones y apóstrofes', path: ['lastName'] }),
  email: z.string()
    .refine(value => /^\S+@\S+\.\S+$/.test(value), {
      message: 'Ingresa un correo auténtico ejemplo: ejemplo@gmail.com',
      path: ['email']
    }),
})


