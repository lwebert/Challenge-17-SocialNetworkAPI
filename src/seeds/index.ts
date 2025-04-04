// import db from '../config/connection.js';
import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { getUserName, getRandomThoughts } from './data.js';

connection.on('error', (err) => err);

connection.once('open', async () => {
	console.log('connected');

	await cleanDB();

	const usedNames: string[] = [];
	const users = [];

	//make users
	for (let i = 0; i < 4; i++) {
		let username = getUserName();

		while (usedNames.includes(username)) {
			username = getUserName();
		}

		usedNames.push(username);

		const email = `${username}@email.com`;

		//Make thoughts associated to the user (each with 2 reactions)
		const thoughtsData = getRandomThoughts(2);
		const updatedThoughts = thoughtsData.map((thought) => ({
			...thought,
			username: username,
		}));

		const thoughts = await Thought.insertMany(updatedThoughts);

		//make the users
		users.push({
			// Users = name, email, thoughts, friends
			name: username,
			email: email.toLowerCase(),
			thoughts: thoughts.map((thought) => thought._id),
			friends: [],
		});
	}

	try {
		await User.insertMany(users);
		console.log('Successfully seeded user data.');
	} catch (err: any) {
		console.error('Error seeding user data:', err.message);
	}

	process.exit(0);
});
