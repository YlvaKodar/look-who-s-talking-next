import { z } from 'zod';
import { Validation } from "@/constants/constants";

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

export const SetupMeetingFormSchema = z.object({
    title: z.string().min(3, { message: Validation.meetingTitle }).max(30, { message: Validation.meetingTitle } ).trim(),
    womenCount: z.number().min(0, { message: Validation.cannotBeNegative }),
    nonbinaryCount: z.number().min(0, { message: Validation.cannotBeNegative }),
    menCount: z.number().min(0, { message: Validation.cannotBeNegative }),
    totalCount: z.number(),
}).refine((data) => {
    const participantCount = [data.womenCount, data.nonbinaryCount, data.menCount].filter(count => count > 0);
    return participantCount.length >= 2;
    },
    {
        message: Validation.minParticipants,
        path: ["totalCount"]
    }
);
export type SetupMeetingFormData = z.infer<typeof SetupMeetingFormSchema>;