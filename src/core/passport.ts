import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { IUserModelDocument, UserModel } from '../models/UserModel';
import { isValidPassword } from '../utils/hashPassword';

passport.use(
	new LocalStrategy(
		async (username, password, done): Promise<void> => {
			try {
				const user = await UserModel.findOne({
					$or: [{ email: username }, { username }],
				}).exec();

				if (user && isValidPassword(user.password, password)) {
					return done(null, user);
				}

				return done(null, false);
			} catch (error) {
				return done(error);
			}
		}
	)
);

passport.use(
	new JWTStrategy(
		{
			secretOrKey: process.env.SECRET_KEY,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		},
		async (payload, done) => {
			try {
				return done(null, payload.user);
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.serializeUser((user: IUserModelDocument, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await UserModel.findById(id).exec();
		done(null, user);
	} catch (error) {
		done(error);
	}
});

export { passport };
