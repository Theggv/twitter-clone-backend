import { generateSHA256 } from './generateHash';

export const hashPassword = (password: string) =>
	generateSHA256(password + process.env.SECRET_KEY);

export const isValidPassword = (passwordHash: string, password: string) =>
	passwordHash === hashPassword(password);
