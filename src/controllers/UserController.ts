import express from 'express';
import { validationResult } from 'express-validator';
import { UserModel } from '../models/UserModel';
import { generateSHA256 } from '../utils/generateHash';
import mailer from '../core/mailer';
import { SentMessageInfo } from 'nodemailer';
import { sendConfirmationEmail } from '../utils/sendEmail';

class UserController {
	async index(_: any, res: express.Response): Promise<void> {
		try {
			const users = await UserModel.find({}).exec();

			res.status(200).json({
				status: 'success',
				result: users,
			});
		} catch (error) {
			res.status(500).json({
				status: 'error',
				result: error,
				error: true,
			});
		}
	}

	async create(req: express.Request, res: express.Response): Promise<void> {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({
					status: 'error',
					result: errors.array(),
					error: true,
				});
				return;
			}

			const data = {
				email: req.body.email,
				fullname: req.body.fullname,
				username: req.body.username,
				password: req.body.password,
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
				(err, info) => {
					if (err) {
						res.json({
							status: 'error',
							result: err,
							error: true,
						});
					} else {
						res.json({
							status: 'success',
							result: user,
							error: false,
						});
					}
				}
			);
		} catch (error) {
			res.status(500).json({
				status: 'error',
				result: error,
				error: true,
			});
		}
	}

	async verify(req: express.Request, res: express.Response): Promise<void> {
		try {
			const hash = req.query.hash?.toString();

			if (!hash) {
				res.status(400).send();
				return;
			}

			const user = await UserModel.findOne({
				confirmHash: hash,
			}).exec();

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

			res.status(201).json({
				status: 'success',
			});
		} catch (error) {
			res.status(500).json({
				status: 'error',
				result: error,
				error: true,
			});
		}
	}

	async update(req: express.Request, res: express.Response): Promise<void> {
		try {
		} catch (error) {
			res.json({
				status: 'error',
				result: error,
				error: true,
			});
		}
	}

	async delete(req: express.Request, res: express.Response): Promise<void> {
		try {
		} catch (error) {
			res.json({
				status: 'error',
				result: error,
				error: true,
			});
		}
	}
}

export const UserCtrl = new UserController();
