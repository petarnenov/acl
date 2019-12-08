import { Request } from 'express';
import User from '../models/userModel';
import { Job } from 'bull';

export const registerUser = async (job: Job) => {
	const { email, password } = job.data;
	try {
		const user = await new User();
		user.setPassword(password);
		user.email = email;
		const savedUser = await user.save();
		return { id: savedUser.id };
	} catch (err) {
		return { err: err.message };
	}
};

// export const loginUser = async (job: Job) => {
// 	const { email, password } = job.data;
// 	console.log(email,password);
// 	try {
// 		const user = await User.findOne({ email });
// 		if (user) {
// 			const isValidUser = user.validPassword(password);
// 			if (isValidUser) {
// 				return { id: user.id };
// 			}
// 			return { err: 'Unknown user' };
// 		}
// 	} catch (err) {
// 		return { err: err.message };
// 	}
// };

export const deleteUser = async (job: Job) => {
	const { id } = job.data;
	try {
		const user = await User.findByIdAndDelete(id);
		if (!user) {
			return { user };
		} else {
			return { user: user.id };
		}
	} catch (err) {
		return { err: err.message };
	}
};

export const getAllUsers = async (job: Job) => {
	job.progress(30);
	try {
		const users = await User.find();
		const usersSafe = users.map(u => ({
			id: u.id,
			email: u.email,
			name: u.name,
			age: u.age
		}));
		job.progress(100);
		return { users: usersSafe };
	} catch (err) {
		job.progress(100);
		return { err: err.message };
	}
};

export const infoUser = async (job: Job) => {
	const { id } = job.data;
	job.progress(30);
	try {
		const user = await User.findById(id);
		if (user) {
			const { email, name, age } = user;
			job.progress(100);
			return { id, email, name, age };
		} else {
			job.progress(100);
			return { user };
		}
	} catch (err) {
		job.progress(100);
		return { err: err.message };
	}
};

export const updateUser = async (job: Job) => {
	const { id, age, firstName, lastName } = job.data;
	await job.progress(30);
	try {
		const user = await User.findByIdAndUpdate(
			id,
			{
				age: age,
				name: {
					firstName,
					lastName
				}
			},
			{ new: true }
		);
		if (user) {
			const { email, name, age } = user;
			await job.progress(100);
			return { id, email, name, age };
		} else {
			await job.progress(100);
			return { user };
		}
	} catch (err) {
		await job.progress(100);
		return { err: err.message };
	}
};
