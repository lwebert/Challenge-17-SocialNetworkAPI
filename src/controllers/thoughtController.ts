import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb'; //for aggregate functions... not sure if need
import { User, Thought } from '../models/index.js';

// GET All Thoughts /Thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
	try {
		let thoughts = await Thought.find();

		//TODO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
		// const thoughtsObj = {...thoughts, Thought.reactionCount }

		res.json(thoughts);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

// GET Thought by id /thoughts/:thoughtId
export const getThoughtById = async (req: Request, res: Response) => {
	const { thoughtId } = req.params;
	try {
		const thought = await Thought.findById(thoughtId);

		if (thought) {
			res.json(thought);
			//TODO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
			// res.json( { thought, reactionCount: Thought.reactionCount })
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
			{ runValidators: true, new: true } //TODO: What does this do?
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

//TODO:  DELETE Thought /thoughts/:thoughtId
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
			{ new: true } //TODO: What does this do?
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
		res.status(500).json({ message: err.message });
	}
};

//TODO: addReaction,
// POST /thoughts/:thoughtId/reactions
export const addReaction = async (req: Request, res: Response) => {
	console.log('You are adding a reaction to a thought.');
	console.log(req.body);

	try {
		const thought = await Thought.findOneAndUpdate(
			{ thoughts: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ runValidators: true, new: true } //TODO: What do these to?
		);

		if (!thought) {
			return res
				.status(404)
				.json({ message: 'No thought found with that ID. Could not add reaction.' });
		}

		return res.json(thought);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

//TODO: removeReaction,
// DELETE /thoughts/:thoughtId/reactions/:reactionId

