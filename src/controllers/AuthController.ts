import express, { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { IUserModelDocument, UserModel } from '../models/UserModel';
import { generateSHA256 } from '../utils/generateHash';
import { hashPassword } from '../utils/hashPassword';
import { sendConfirmationEmail } from '../utils/sendEmail';

export class AuthController {
	async verify(
		req: express.Request,
		res: express.Response,
		next: NextFunction
	): Promise<void> {
		try {
			const hash = req.query.hash?.toString();

			if (!hash) {
				res.status(400).send();
				return;
			}

			const user = await UserModel.findOne({ confirmHash: hash }).exec();

			if (!user) {
				res.status(404).send();
				return;
			}

			if (user.confirmed) {
				res.status(400).send('Данная ссылка более не действительна.');
				return;
			}

			user.confirmed = true;
			user.save();

			res.status(200).json({
				status: 'success',
			});
		} catch (error) {
			next(error);
		}
	}

	async check(
		req: express.Request,
		res: express.Response,
		next: NextFunction
	): Promise<void> {
		res.status(200).send();
	}

	async signup(
		req: express.Request,
		res: express.Response,
		next: NextFunction
	): Promise<void> {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				res.status(400).json({
					status: 'error',
					result: errors.array(),
				});
				return;
			}

			const data = {
				email: req.body.email,
				fullname: req.body.fullname,
				username: req.body.username,
				password: hashPassword(req.body.password),
				confirmHash: generateSHA256(
					process.env.SECRET_KEY + Math.random().toString()
				),
			};

			const user = await UserModel.create(data);

			sendConfirmationEmail(
				{
					to: data.email,
					confirmHash: data.confirmHash,
				},
				async (err, _) => {
					if (err) {
						next(err);
					} else {
						res.status(201).send();
					}
				}
			);
		} catch (error) {
			next(error);
		}
	}

	async signin(
		req: express.Request,
		res: express.Response,
		next: NextFunction
	): Promise<void> {
		try {
			const user = req.user as IUserModelDocument;

			if (!user) {
				throw { status: 404 };
			}
			res.status(200).json({
				status: 'success',
				result: {
					user: user,
					token: jwt.sign(
						{
							user: {
								_id: user.id,
								email: user.email,
								username: user.username,
							},
						},
						process.env.SECRET_KEY!,
						{
							expiresIn: '30d',
						}
					),
				},
			});
		} catch (error) {
			next(error);
		}
	}
}
