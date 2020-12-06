import { Router } from 'express';
import passport from 'passport';
import { UserController } from '../controllers/UserController';

const router = Router();
const controller = new UserController();

router.get('/', controller.index);
router.get('/me', passport.authenticate('jwt'), controller.me);
router.get('/:id', controller.show);
router.patch('/', controller.update);
router.delete('/', controller.destroyAll);

export const UsersRouter = router;
