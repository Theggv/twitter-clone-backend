import { Router } from 'express';
import { passport } from '../core/passport';
import { AuthController } from '../controllers/AuthController';
import { signupValidator } from '../validations/signup';

const router = Router();
const controller = new AuthController();

router.get('/verify', controller.verify);
router.get('/check', passport.authenticate('jwt'), controller.check);
router.post('/signin', passport.authenticate('local'), controller.signin);
router.post('/signup', signupValidator, controller.signup);

export const AuthRouter = router;
