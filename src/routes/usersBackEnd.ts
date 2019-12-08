import { Router, Response } from 'express';
import {
	registerUserProducer,
	allUsersProducer,
	deleteUserProducer,
	infoUserProducer,
	//loginUserProducer,
	updateUserProducer
} from '../queuies/producers/usersProducer';
import { Job } from 'bull';
import passport from 'passport';
const gard = require('connect-ensure-login').ensureLoggedIn('/');

export const usersBackEndRouter = Router();

/* GET users listing. */
usersBackEndRouter.get('/', gard, async (req, res) => {
	const job = await allUsersProducer();
	await getResponseFromJob(job, res);
});

/* POST register user. */
usersBackEndRouter.post('/register', async (req, res) => {
	const job = await registerUserProducer(req);
	// await getResponseFromJob(job, res);
	res.render('index', { title: 'Main' });
});

usersBackEndRouter.post(
	'/login',
	passport.authenticate('local', { failureRedirect: '/auth/login' }),
	async (req, res) => {
		// const job = await loginUserProducer(req);
		// await getResponseFromJob(job, res);
		console.log(req.user);
		res.render('profile', { user: req.user, title: 'Profile' });
	}
);

/* GET logout user. */
usersBackEndRouter.get('/logout', gard, (req, res) => {
	req.logout();
	res.render('index', { title: 'Main' });
});

/* POST update user. */
usersBackEndRouter.post('/update/:id', gard, async (req, res) => {
	const job = await updateUserProducer(req);
	await getResponseFromJob(job, res);
});

/* DELETE delete user by id. */
usersBackEndRouter.delete('/:id', gard, async (req, res) => {
	const job = await deleteUserProducer(req);
	await getResponseFromJob(job, res);
});

/* GET user info by id. */
usersBackEndRouter.get('/:id', gard, async (req, res) => {
	const job = await infoUserProducer(req);
	await getResponseFromJob(job, res);
});

async function getResponseFromJob(job: Job, res: Response) {
	const { err, users, id, user, email, name, age } = await job.finished();
	if (err) {
		res.status(500);
		res.send({ err });
	} else {
		res.status(200);
		res.send({ id, users, user, email, name, age });
	}
}
