import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User, { IUserModel } from '../models/userModel';

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			session: true
		},
		function(username, password, done) {
			User.findOne({ email: username }, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}
				if (!user.validPassword(password)) {
					return done(null, false);
				}
				return done(null, user);
			});
		}
	)
);

passport.serializeUser(function(user: IUserModel, cb) {
	cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	User.findById(id, function(err, user) {
		if (err) {
			return cb(err);
		}
		cb(null, user);
	});
});
