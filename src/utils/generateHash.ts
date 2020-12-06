import crypto from 'crypto';

export const generateSHA256 = (value: string): string => {
	return crypto.createHash('sha256').update(value).digest('hex');
};

export const generateSHA512 = (value: string): string => {
	return crypto.createHash('sha512').update(value).digest('hex');
};
