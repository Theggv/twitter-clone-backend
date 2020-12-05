import express from 'express';

const app = express();

app.get('/users');

app.listen(4000, () => {
	console.log('Server is running...');
});
