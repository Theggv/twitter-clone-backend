import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const options: SMTPTransport.Options = {
	host: process.env.NODEMAILER_HOST,
	port: Number(process.env.NODEMAILER_PORT),
	auth: {
		user: process.env.NODEMAILER_USER,
		pass: process.env.NODEMAILER_PASS,
	},
};

const transport = nodemailer.createTransport(options);

export default transport;
