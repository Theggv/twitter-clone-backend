import { body } from 'express-validator';

export const signupValidator = [
	body('email', 'Введите email')
		.isString()
		.isEmail()
		.withMessage('Неверный email')
		.isLength({ min: 10, max: 40 })
		.withMessage('Допустимое кол-во символов в почте от 10 до 40'),
	body('fullname', 'Введите ваше имя')
		.isString()
		.isLength({ min: 2, max: 50 })
		.withMessage('Допустимое кол-во символов в имени от 2 до 50'),
	body('username', 'Укажите логин')
		.isString()
		.isLength({ min: 2, max: 40 })
		.withMessage('Допустимое кол-во символов в имени от 2 до 40'),
	body('password', 'Укажите пароль')
		.isString()
		.isLength({ min: 8 })
		.withMessage('Минимальная длина пароля 8 символов')
		.custom((value, { req }) => {
			if (value != req.body.password2) {
				throw new Error('Пароли не совпадают');
			} else return value;
		}),
];
