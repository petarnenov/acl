import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from "passport"

import { indexRouter } from './routes/index';
import { usersBackEndRouter } from './routes/usersBackEnd';
import { usersFrontEndRouter } from './routes/usersFrontEnd';

import { arenaConfig } from './config/arenaConfig';
import session from './config/sessionConfig';

export const app = express();

// view engine setup
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersBackEndRouter);
app.use('/arena', arenaConfig);
app.use('/auth', usersFrontEndRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(
	err: createError.HttpError,
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
