
import {z} from 'zod';
export const infoRepresentativeSchema = z.object({
  firstName: z.string()
  .min(3, { message: 'El nombre debe tener más de 3 letras' })
  .max(15, { message: 'El nombre es muy largo' })
  .refine(value => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(value), {
    message:  'El nombre solo puede contener letras, espacios, guiones y apóstrofes', path: ['firstName'] }),
lastName: z.string()
  .min(3, { message: 'El apellido debe tener más de 3 letras' })
  .max(15, { message: 'El apellido es muy largo' })
  .refine(value => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(value), {
    message:  'El apellido solo puede contener letras, espacios, guiones y apóstrofes', path: ['lastName'] }),
  phone: z.string().refine(phone => {
    const num = parseInt(phone, 10);
    return !isNaN(num) && num > 0;
  }, {
    message: 'Phone must be a positive integer'
  }),
  Adress: z.string()
  .min(10, { message: 'La direccion debe tener más de 10 caracteres' })
  .max(30, { message: 'El nombre es muy largo' })
});