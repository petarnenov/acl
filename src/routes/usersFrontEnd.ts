import { Router } from 'express';
const gard = require('connect-ensure-login').ensureLoggedIn('/');
export const usersFrontEndRouter = Router();

/* GET register page. */
usersFrontEndRouter.get('/register', async (req, res) => {
	res.render('register', { title: 'Register' });
});

/* GET login page. */
usersFrontEndRouter.get('/login', async (req, res) => {
	res.render('login', { title: 'Login' });
});

usersFrontEndRouter.get('/profile', gard, async (req, res) => {
	res.render('profile', { title: 'Profile' });
});
