import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// GET All Thoughts /Thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
	try {
		const thoughts = await Thought.find().populate('reactions');
		res.json(thoughts);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

// GET Thought by id /thoughts/:thoughtId
export const getThoughtById = async (req: Request, res: Response) => {
	const { thoughtId } = req.params;
	try {
		const thought = await Thought.findById(thoughtId).populate('reactions');

		if (thought) {
			res.json(thought);
		} else {
			res.status(404).json({ message: 'Thought not found.' });
		}
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

// POST Thought /thoughts
export const createThought = async (req: Request, res: Response) => {
	const { thought } = req.body;
	try {
		const newthought = await Thought.create({ thought });
		res.status(201).json(newthought);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
};

// PUT Thought /thoughts/:thoughtId
export const updateThoughtById = async (req: Request, res: Response) => {
	try {
		const thought = await Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		);

		if (!thought) {
			res.status(404).json({
				message: 'No thought with this id exists. Cannot be updated.',
			});
		}

		res.json(thought);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
};

// DELETE Thought /thoughts/:thoughtId
export const deleteThoughtById = async (req: Request, res: Response) => {
	try {
		const thought = await Thought.findOneAndDelete({
			_id: req.params.thoughtId,
		});

		if (!thought) {
			return res.status(404).json({
				message: 'No thought with this id exists. Cannot be deleted',
			});
		}

		const user = await User.findOneAndUpdate(
			{ thoughts: req.params.thoughtId },
			{ $pull: { thoughts: req.params.thoughtId } },
			{ new: true }
		);

		if (!user) {
			return res.status(404).json({
				message: 'Thought deleted, but no associated users found.',
			});
		}

		return res.json({
			message:
				'Thought successfully deleted and removed from associated user.',
		});
	} catch (err: any) {
		return res.status(500).json({ message: err.message });
	}
};

// POST /thoughts/:thoughtId/reactions
export const addReaction = async (req: Request, res: Response) => {
	console.log('You are adding a reaction to a thought.');

	if (!req.body.reactionBody) {
		return res.status(400).json({ message: 'Reaction body is required.' });
	}

	try {
		const thought = await Thought.findById(req.params.thoughtId);

		if (!thought) {
			return res.status(404).json({
				message:
					'No thought found with that ID. Could not add reaction.',
			});
		}

		const updatedThought = await Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{
				$addToSet: {
					reactions: {
						reactionBody: req.body,
						username: thought.username,
					},
				},
			},
			{ runValidators: true, new: true }
		);

		return res.json(updatedThought);
	} catch (err: any) {
		return res.status(500).json({ message: err.message });
	}

	// const { thoughtId } = req.params;
	// const { reactionBody } = req.body;

	// const thought = await Thought.findById(thoughtId).populate('username');

	// if (!thought) {
	// 	return res.status(404).json({
	// 		message:
	// 			'No thought found with that ID. Could not add reaction.',
	// 	});
	// }

	// const reaction = {
	// 	reactionBody,
	// 	username: thought.username,
	// 	createdAt: new Date(),
	// };

	// thought.reactions.push(reaction);

	// return res.json(thought);
};

// DELETE /thoughts/:thoughtId/reactions/:reactionId
export const removeReaction = async (req: Request, res: Response) => {
	try {
		const thought = await Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { reactionId: req.params.reactionId } } },
			{ runValidators: true, new: true }
		);

		if (!thought) {
			return res.status(404).json({
				message:
					'No thought found with that ID, could not delete reaction.',
			});
		}

		return res.json(thought);
	} catch (err: any) {
		return res.status(500).json({ message: err.message });
	}
};
