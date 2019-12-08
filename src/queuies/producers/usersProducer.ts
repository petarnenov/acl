import {
	queueUserAll,
	queueUserDelete,
	queueUserRegister,
	queueUserInfo,
	queueUserLogin,
	queueUserUpdate
} from '../../config/bullConfig';
import { Request } from 'express';
import { pbkdf2Sync } from 'crypto';

export const registerUserProducer = (req: Request) => {
	const { email, password } = req.body;
	const hashPassword = pbkdf2Sync(
		password,
		//FIXME: use secret env variable
		password,
		48,
		64,
		`sha512`
	).toString(`hex`);
	return queueUserRegister.add('register', { email, password: hashPassword });
};

// export const loginUserProducer = (req: Request) => {
// 	const { email, password } = req.body;
// 	const hashPassword = pbkdf2Sync(
// 		password,
// 		//FIXME: use secret env variable
// 		password,
// 		48,
// 		64,
// 		`sha512`
// 	).toString(`hex`);
// 	return queueUserLogin.add('login', { email, password: hashPassword });
// };

export const updateUserProducer = (req: Request) => {
	const { id } = req.params;
	const { firstName, lastName, age } = req.body;
	console.log(id, firstName, lastName, age);
	return queueUserUpdate.add('update', { id, firstName, lastName, age });
};

export const allUsersProducer = () => {
	return queueUserAll.add('all', {});
};

export const deleteUserProducer = (req: Request) => {
	const { id } = req.params;
	return queueUserDelete.add('delete', { id });
};

export const infoUserProducer = (req: Request) => {
	const { id } = req.params;
	return queueUserInfo.add('info', { id });
};
