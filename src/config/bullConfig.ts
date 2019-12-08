import Queue from 'bull';

export const queueUserAll = new Queue('users-all');
export const queueUserRegister = new Queue('user-register');
export const queueUserLogin = new Queue('user-login');
export const queueUserDelete = new Queue('user-delete');
export const queueUserInfo = new Queue('user-info');
export const queueUserUpdate = new Queue('user-update');