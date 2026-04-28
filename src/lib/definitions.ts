import { z } from 'zod';

export const RegisterFormSchema = z.object({
    email: z.email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Must be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Must contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Must contain at least one number.' })
        .trim(),
    repeatPassword: z.string()
}).refine(data => data.password === data.repeatPassword, {
    message: 'Passwords do not match.',
    path: ["repeatPassword"]
});

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;