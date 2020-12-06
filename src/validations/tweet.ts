import { body } from 'express-validator';
import { isValidObjectId } from 'mongoose';

export const tweetValidator = [
	body('text', 'Введите текст').isString(),
	body('user')
		.custom((value) => isValidObjectId(value))
		.withMessage('Некорректный user'),
];
