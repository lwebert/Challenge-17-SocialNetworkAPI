import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// GET All Users /users
export const getAllUsers = async (_req: Request, res: Response) => {
	console.log('Getting all users.');
	try {
		const users = await User.find()
			.populate('thoughts')
			.populate('friends');
		res.json(users);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

// GET User by id /users/:userId
export const getUserById = async (req: Request, res: Response) => {
	console.log('Getting one user by their user ID.');
	const { userId } = req.params;
	try {
		const user = await User.findById(userId)
			.populate('thoughts')
			.populate('friends');

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
	console.log('Creating a new user.');
	try {
		const { name, email } = req.body;
		const newUser = await User.create({ name, email });

		res.status(201).json(newUser);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
};

// PUT User /users/:userId
export const updateUserById = async (req: Request, res: Response) => {
	console.log('Updating a user by their user ID.');
	try {
		const user = await User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		);

		if (!user) {
			res.status(404).json({
				message: 'No user with this ID exists. Cannot be updated.',
			});
		}

		res.json(user);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
};

// 	deleteUserById,
export const deleteUserById = async (req: Request, res: Response) => {
	console.log('Deleting a user by their user ID.');
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

// POST Friend /api/users/:userId/friends
export const addFriend = async (req: Request, res: Response) => {
	console.log('You are adding a friend to a user.');

	if (!req.body.name) {
		return res.status(400).json({
			message: 'Body is required. Please provide the friend name.',
		});
	}

	try {
		const friend = await User.findOne({ name: req.body.name });

		if (!friend) {
			return res.status(404).json({
				message: 'No user with that name found. Could not add friend.',
			});
		}

		const updatedUser = await User.findOneAndUpdate(
			{ _id: req.params.userId },
			{
				$addToSet: {
					friends: {
						_id: friend._id,
						name: friend.name,
						email: friend.email,
						thoughts: friend.thoughts,
					},
				},
			},
			{ runValidators: true, new: true }
		);

		if (!updatedUser) {
			return res.status(404).json({
				message: 'No user found with that ID. Could not add friend.',
			});
		}

		console.log(
			`Successfully added friend ${req.body.name} to user ${updatedUser.name}.`
		);
		return res.json(updatedUser);
	} catch (err: any) {
		return res.status(500).json({ message: err.message });
	}
};

// DELETE Friend /api/users/:userId/friends/:friendId
export const removeFriend = async (req: Request, res: Response) => {
	console.log('You are removing a friend from a user.');

	try {
		const user = await User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } },
			{ new: true }
		);

		if (!user) {
			return res.status(404).json({
				message: 'No user found with that ID, could not delete friend.',
			});
		}

		console.log(`Friend successfully removed from user ${user.name}`);
		return res.json(user);
	} catch (err: any) {
		return res.status(500).json({ message: err.message });
	}
};
