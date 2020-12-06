import dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction } from 'express';

import './core/db';
import { UsersRouter } from './routes/users';

const app = express();

app.use(express.json());

app.use('/users', UsersRouter);

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
		res.status(err?.status || 500).send();
	}
);

app.listen(process.env.PORT || 4000, () => {
	console.log('Server is running...');
});
