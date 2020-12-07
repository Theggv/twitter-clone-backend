import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction } from 'express';
import passport from 'passport';

import './core/db';
import { Routes } from './routes';

const app = express();

// register middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(Routes);

// handle 404
app.use((req, res, next) => {
	let err = { status: 404 };
	next(err);
});

// error handler
app.use(
	(
		err: any,
		req: express.Request,
		res: express.Response,
		next: NextFunction
	) => {
		res.status(err?.status || 500).json({
			status: 'error',
			result: err,
		});
	}
);

app.listen(process.env.PORT || 4000, () => {
	console.log('Server is running...');
});
