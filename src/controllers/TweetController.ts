import express, { NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ITweetModel, TweetModel } from '../models/TweetModel';
import { UserModel } from '../models/UserModel';

export class TweetController {
	async index(
		req: express.Request,
		res: express.Response,
		next: NextFunction
	): Promise<void> {
		try {
			const tweets = await TweetModel.find({})
				.populate({
					path: 'user',
					select: '_id fullname username avatar about',
				})
				.populate({
					path: 'retweets',
				})
				.exec();

			res.status(200).json({
				status: 'success',
				result: tweets,
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
			const tweetId = req.params.id;

			const tweet = await TweetModel.findById(tweetId)
				.populate({
					path: 'user',
					select: '_id fullname username avatar about',
				})
				.exec();

			if (!tweet) {
				res.status(404).send();
				return;
			}

			res.status(200).json({
				status: 'success',
				result: tweet,
			});
		} catch (error) {
			next(error);
		}
	}

	async store(
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

			const data: ITweetModel = {
				text: req.body.text,
				user: req.body.user,
			};

			const authUser = req.user as any;

			if (data.user !== authUser._id) {
				res.status(400).send(
					"Can't create tweet, because user token and query token are different."
				);
			}

			const user = await UserModel.findById(data.user).exec();

			if (!user) {
				res.status(404).send('Пользователь не найден');
			}

			const tweet = await TweetModel.create(data);

			res.status(201).send();
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
			await TweetModel.deleteMany({}).exec();
			res.redirect(req.baseUrl);
		} catch (error) {
			next(error);
		}
	}
}
