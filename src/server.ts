import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import './core/db';

import { UserCtrl } from './controllers/UserController';
import { registerValidations } from './validations/register';

const app = express();

app.use(express.json());

app.get('/users', UserCtrl.index);
app.post('/users', registerValidations, UserCtrl.create);
app.patch('/users', UserCtrl.update);
app.delete('/users', UserCtrl.delete);

app.get('/users/verify', UserCtrl.verify);

app.listen(process.env.PORT || 4000, () => {
	console.log('Server is running...');
});
