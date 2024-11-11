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


export const fullNameSchema = z.object({
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
})


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
  cI: z.number()
    .int({ message: 'CI debe ser un número entero' })
    .positive({ message: 'CI debe ser un número positivo' }),
  age: z.number()
    .int({ message: 'La edad debe ser un número entero' })
    .positive({ message: 'La edad debe ser un número positivo' }),
  dateBirth: z.string()
    .refine(value => !isNaN(Date.parse(value)), {
      message: 'Fecha de nacimiento no válida',
      path: ['dateBirth']
    }),
});

export const infoDancerSchema = z.object({
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
  .min(10, { message: 'El nombre debe tener más de 3 letras' })
  .max(30, { message: 'El nombre es muy largo' })
  .refine(value => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(value), {
    message: 'El nombre solo puede contener letras, espacios, guiones y apóstrofes',
    path: ['Adress']
  }),
});

export const infoRepresentativeSchema = z.object({
  phone: z.string().refine(phone => {
    const num = parseInt(phone, 10);
    return !isNaN(num) && num > 0;
  }, {
    message: 'Phone must be a positive integer'
  }),
  Adress: z.string()
  .min(10, { message: 'El nombre debe tener más de 3 letras' })
  .max(30, { message: 'El nombre es muy largo' })
  .refine(value => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(value), {
    message: 'El nombre solo puede contener letras, espacios, guiones y apóstrofes',
    path: ['Adress']
  }),
});