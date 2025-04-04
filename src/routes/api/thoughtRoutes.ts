import { Router } from 'express';

const router = Router();

import {
	getAllThoughts,
	getThoughtById,
	createThought,
	updateThoughtById,
	deleteThoughtById,
	addReaction,
	removeReaction,
} from '../../controllers/thoughtController.js';

// Thoughts: /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// Thoughts: /api/thoughts/:thoughtId
router
	.route('/:thoughtId')
	.get(getThoughtById)
	.put(updateThoughtById)
	.delete(deleteThoughtById);

// Reactions: /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// Reactions: /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

export { router as thoughtRouter };
