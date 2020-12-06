import { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import mailer from '../core/mailer';

export const sendEmail = (
	options: Mail.Options,
	callback?: (err: Error | null, info: SentMessageInfo) => void
) => {
	mailer.sendMail(
		options,
		callback
			? callback
			: (err: Error | null, info: SentMessageInfo) => {
					if (err) {
						console.error(err);
					} else {
						console.log(info);
					}
			  }
	);
};

export const sendConfirmationEmail = (
	{ to, confirmHash }: { to: string; confirmHash: string },
	callback?: (err: Error | null, info: SentMessageInfo) => void
) =>
	sendEmail(
		{
			from: 'twitter@test.com',
			to: to,
			subject: 'Подтверждение почты Twitter Clone',
			html: `Для того, чтобы подтвердить почту перейдите <a href="http://localhost:${process.env.PORT}/users/verify?hash=${confirmHash}">по этой ссылке</a>`,
		},
		callback
	);
