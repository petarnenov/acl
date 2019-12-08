import {
	queueUserAll,
	queueUserRegister,
	queueUserDelete,
	queueUserInfo,
	queueUserLogin,
	queueUserUpdate
} from '../../config/bullConfig';
import {
	getAllUsers,
	registerUser,
	deleteUser,
	infoUser,
	//loginUser,
	updateUser
} from '../../handlers/userHandler';

queueUserAll.process('all', async job => {
	return getAllUsers(job);
});

queueUserRegister.process('register', job => {
	return registerUser(job);
});

// queueUserLogin.process('login', job => {
// 	return loginUser(job);
// });

queueUserDelete.process('delete', job => {
	return deleteUser(job);
});

queueUserInfo.process('info', job => {
	return infoUser(job);
});

queueUserUpdate.process('update', job => {
	return updateUser(job);
});
