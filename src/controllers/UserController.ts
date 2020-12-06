import express, { NextFunction } from 'express';
import { IUserModelDocument, UserModel } from '../models/UserModel';
import mongoose from 'mongoose';

export class UserController {
	async index(
		req: express.Request,
		res: express.Response,
		next: NextFunction
	): Promise<void> {
		try {
			const users = await UserModel.find({}).exec();

			res.json({
				status: 'success',
				result: users,
			});
		} catch (error) {
			next(error);
		}
	}

	async show(
		req: express.Request,
		res: express.Response,
		next: NextFunction
	): Promise<void> {
		try {
			const userId = req.params.id;

			if (!mongoose.isValidObjectId(userId)) {
				res.status(400).send();
				return;
			}

			const user = await UserModel.findById(userId).exec();

			if (!user) {
				res.status(404).send();
				return;
			}

			res.json({
				status: 'success',
				result: user,
			});
		} catch (error) {
			next(error);
		}
	}

	async me(
		req: express.Request,
		res: express.Response,
		next: NextFunction
	): Promise<void> {
		try {
			const user = req.user as IUserModelDocument;

			if (!user) {
				res.status(404).send();
				return;
			}

			res.json({
				status: 'success',
				result: user,
			});
		} catch (error) {
			next(error);
		}
	}

	async update(
		req: express.Request,
		res: express.Response,
		next: NextFunction
	): Promise<void> {
		try {
		} catch (error) {
			next(error);
		}
	}

	/**
	 * dev only!
	 * @param req
	 * @param res
	 * @param next
	 */
	async destroyAll(
		req: express.Request,
		res: express.Response,
		next: NextFunction
	): Promise<void> {
		try {
			await UserModel.deleteMany({}).exec();
			res.status(200).send();
		} catch (error) {
			next(error);
		}
	}
}
