import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { registerValidations } from '../validations/register';

const router = Router();
const controller = new UserController();

router.get('/', controller.index);
router.get('/verify', controller.verify);
router.post('/', registerValidations, controller.create);
router.patch('/', controller.update);
router.delete('/', controller.delete);
router.get('/:id', controller.show);

export const UsersRouter = router;
