import {z} from 'zod';
export const infoDancerSchema = z.object({
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
  allergies: z.string().optional(),

  cI: z.string().refine(cI => !isNaN(parseFloat(cI)), {
    message: "cI must be a number"
  }),

  phone: z.string().refine(phone => {
    const num = parseInt(phone, 10);
    return !isNaN(num) && num > 0;
  }, {
    message: 'Phone must be a positive integer'
  }),

  age: z.string().refine(age => {
    const num = parseInt(age, 10);
    return !isNaN(num) && num > 0;
  }, {
    message: 'La edad debe ser un número entero y positivo'
  }),

  dateBirth: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: 'Fecha de nacimiento no válida',
    path: ['dateBirth']
  }),
  Adress: z.string()
  .min(10, { message: 'La direccion debe tener más de 10 caracteres' })
  .max(30, { message: 'El nombre es muy largo' })
});