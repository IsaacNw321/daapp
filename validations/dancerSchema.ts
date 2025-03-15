import {z} from 'zod';
export const infoDancerSchema = z.object({
  firstName: z.string()
    .min(3, { message: 'El nombre debe tener más de 3 letras' })
    .max(15, { message: 'El nombre es muy largo' })
    .refine(value => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(value), {
      message: 'El nombre solo puede contener letras, espacios, guiones y apóstrofes', path: ['firstName'] }),
  lastName: z.string()
    .min(3, { message: 'El apellido debe tener más de 3 letras' })
    .max(15, { message: 'El apellido es muy largo' })
    .refine(value => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(value), {
      message: 'El apellido solo puede contener letras, espacios, guiones y apóstrofes', path: ['lastName'] }),
  allergies: z.string().optional(),
  cI: z.string().min(6, { message: 'La cedula debe tener al menos 6 digitos' })
    .max(9, { message: 'La cedula debe tener menos de 10 digitos' }).refine(cI => !isNaN(parseFloat(cI)), {
    message: "La cedula debe ser un numero"
  }),
  phone: z.string().min(7, { message: 'El numero debe tener mas de 7 digitos' })
    .max(7, { message: 'El numero debe tener maximo 7 digitos' }).refine(phone => {
    const num = parseInt(phone, 10);
    return !isNaN(num) && num > 0;
  }, {
    message: 'El numero telefonico debe tener 11 digitos'
  }),
  age: z.string(),
  dateBirth: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: 'Fecha de nacimiento no válida',
    path: ['dateBirth']
  }),
  Adress: z.string()
    .min(10, { message: 'La direccion debe tener más de 10 caracteres' })
    .max(30, { message: 'El nombre es muy largo' }),
});