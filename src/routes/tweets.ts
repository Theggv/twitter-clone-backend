import { Router } from 'express';
import passport from 'passport';
import { TweetController } from '../controllers/TweetController';
import { tweetValidator } from '../validations/tweet';

const router = Router();
const controller = new TweetController();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post(
	'/',
	passport.authenticate('jwt'),
	tweetValidator,
	controller.store
);
router.delete('/', controller.destroyAll);

export const TweetsRouter = router;
