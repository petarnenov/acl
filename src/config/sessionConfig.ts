import session from 'express-session';
import mongoose from 'mongoose';

const MongoStore = require('connect-mongo')(session);

var sess = {
	secret: 'kanatunta',
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	cookie: {
		secure: false
	}
};

if (process.env.NODE_ENV === 'production') {
	sess.cookie.secure = true;
}

export default session(sess);
