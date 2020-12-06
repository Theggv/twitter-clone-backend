import { Router } from 'express';

import { AuthRouter } from './auth';
import { UsersRouter } from './users';

const router = Router();

router.use('/users', UsersRouter);
router.use('/auth', AuthRouter);

export const Routes = router;
