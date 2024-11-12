
import {z} from 'zod';
export const danceRSchema = z.object({
  firstName: z.string()
    .min(3, { message: 'El nombre debe tener más de 3 letras' })
    .max(20, { message: 'El nombre es muy largo' })
    .refine(value => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(value), {
      message: 'El nombre solo puede contener letras, espacios, guiones y apóstrofes',
      path: ['firstName']
    }),
  lastName: z.string()
    .min(3, { message: 'El apellido debe tener más de 3 letras' })
    .max(20, { message: 'El apellido es muy largo' })
    .refine(value => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(value), {
      message: 'El apellido solo puede contener letras, espacios, guiones y apóstrofes',
      path: ['lastName']
    }),
  allergies: z.string().optional(), 
  cI: z.string().refine(cI => !isNaN(parseFloat(cI)), {
    message: "cI must be a number"
  }),
  age: z.string().refine(age => {
    const num = parseInt(age, 10);
    return !isNaN(num) && num > 0;
  }, {
    message: 'La edad debe ser un número entero y positivo'
  }),
  dateBirth: z.string()
    .refine(value => !isNaN(Date.parse(value)), {
      message: 'Fecha de nacimiento no válida',
      path: ['dateBirth']
    }),
});

