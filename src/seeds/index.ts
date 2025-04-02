// import db from '../config/connection.js';
import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { getUserName, getRandomThoughts } from './data.js';

connection.on('error', (err) => err);

connection.once('open', async () => {
	console.log('connected');

	await cleanDB();
	// //Make sure collections are actually empty
	// const userCount = await User.countDocuments();
	// const thoughtCount = await Thought.countDocuments();
	// if (userCount > 0 || thoughtCount > 0) {
	// 	console.error('Collections are not empty after cleaning!');
	// 	process.exit(1);
	// }
	const usedNames: string[] = [];
	const users = [];

	//make 10 users
	for (let i = 0; i < 10; i++) {
		let username = getUserName();

		while (usedNames.includes(username)) {
			username = getUserName();
		}

		usedNames.push(username);

		//check if user already exists in database
		// const existingUser = await User.findOne({ name: username });
		// if (existingUser) {
		// 	while ()
		// 	continue; // Skip this iteration if the username exists
		// }

		const email = `${username}@email.com`;

		//Make 4 thoughts associated to the user (each with 2 reactions)
		const thoughtsData = getRandomThoughts(4);
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

		// console.log('Users: ', users);
	}

	try {
		await User.insertMany(users);
		console.log('Successfully seeded user data.');
	} catch (err: any) {
		console.error('Error seeding user data:', err.message);
	}

	process.exit(0);
});

//TODO: Finish seed file!

// try {
// 	await db();
// 	await cleanDB();

// 	//Generate users
// 	let users: any = [];
// 	for (let i = 0; i < 10; i++) {
// 		// for (let i = 0; i < 10; i++) {
// 		const name = getUserName();
// 		const email = `${name}@email.com`;

// 		if (users?.includes(name)) {
// 			continue;
// 		}
// 		// console.log('Name: ', name);

// 		//Generate thoughts and reactions
// 		const thoughtText = getRandomThoughts(2);
// 		let thoughts = [];
// 		thoughts.push({
// 			thoughtText,
// 			username: name,
// 			reactions: getRandomReactions(1),
// 		});
// 		console.log(thoughts);

// 		//Create thought data
// 		const thoughtData = await Thought.create(thoughts);

// 		const email = `${name}@email.com`;
// 		console.log('Email: ', email);

// 		//Generate friends
// 		let friends: any = [];
// 		for (let j = 0; j < 3; j++) {
// 			const friend = getUsername();
// 			console.log('Friend: ', friend);
// 			if (friend !== name && !friends.includes(friend)) {
// 				friends.push(friend);
// 			}
// 		}
// 		console.log('Friends: ', friends);

// 		//Create user object
// 		// Users = name, email, thoughts, friends
// 		users.push({
// 			username: name,
// 			email,
// 			thoughts: [
// 				...thoughtData.map(({ _id }: { [key: string]: any }) => _id),
// 			],
// 			friends,
// 		});
// 	}

// 	//Save users to datebase
// 	await User.insertMany(users);
// 	console.log('Users successfully seeded to database.');
// } catch (err) {
// 	console.error('Error seeding database: ', err);
// 	process.exit(1);
// }

// Reactions = reactionId, reactionBody, username, createdAt
// Thoughts = thoughtText, createdAt, username, reactions
