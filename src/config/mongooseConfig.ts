import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/acl', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});
const db = mongoose.connection;
db.on('open', () => {
	console.log('db connection opened ...');
});
db.on('error', err => {
	console.error(err.message);
});
db.on('disconnected', () => {
	console.error('db connection closed ...');
});
db.on('reconnected', () => {
	console.error('db connection reconnected ...');
});
