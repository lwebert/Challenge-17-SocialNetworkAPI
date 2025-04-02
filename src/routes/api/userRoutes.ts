import { Router } from 'express';

const router = Router();

import {
	getAllUsers,
	getUserById,
	createUser,
	updateUserById,
	deleteUserById,
	// addFriend,
	// removeFriend,
} from '../../controllers/userController.js';

// Users: /api/users
router.route('/').get(getAllUsers).post(createUser);

// Users: /api/users/:userId
router
	.route('/:userId')
	.get(getUserById)
	.put(updateUserById)
	.delete(deleteUserById);

// Friends: /api/users/:userId/friends
// router.route('/:userId/friends/:friendId').post(addFriend);

// Friends: /api/users/:userId/friends/:friendId
// router.route('/:userId/friends/:friendId').delete(removeFriend);

export { router as userRouter };
