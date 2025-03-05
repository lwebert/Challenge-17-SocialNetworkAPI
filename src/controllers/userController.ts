import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// GET All Users /users
export const getAllUsers = async (_req: Request, res: Response) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

// GET User by id /users/:userId
export const getUserById = async (req: Request, res: Response) => {
	const { userId } = req.params;
	try {
		const user = await User.findById(userId);

		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ message: 'User not found.' });
		}
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

// POST User /users
export const createUser = async (req: Request, res: Response) => {
	const { user } = req.body;
	try {
		const newUser = await User.create({ user });
		res.status(201).json(newUser);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
};

// PUT User /users/:userId
export const updateUserById = async (req: Request, res: Response) => {
	try {
		const user = await User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: req.body },
			{ runValidators: true, new: true } //TODO: What does this do?
		);

		if (!user) {
			res.status(404).json({ message: 'No user with this id!' });
		}

		res.json(user);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
};

// 	deleteUserById,
export const deleteUserById = async (req: Request, res: Response) => {
	try {
		const user = await User.findOneAndDelete({ _id: req.params.userId });

		if (!user) {
			res.status(404).json({ message: 'No user found with that ID.' });
		} else {
			await Thought.deleteMany({ _id: { $in: user.thoughts } });
			res.json({ message: 'User and thoughts deleted!' });
		}
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

//TODO: addFriend,
//TODO: removeFriend,
