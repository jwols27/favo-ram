import { object, ObjectSchema, string } from 'yup';

export type User = {
    id: number;
    name: string;
};

export type Login = {
    username: string;
    password: string;
};

export const LoginSchema: ObjectSchema<Login> = object({
    username: string().required(),
    password: string().required(),
});
