import { Router } from 'express';

import { AuthRouter } from './auth';
import { TweetsRouter } from './tweets';
import { UsersRouter } from './users';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/users', UsersRouter);
router.use('/tweets', TweetsRouter);

export const Routes = router;
