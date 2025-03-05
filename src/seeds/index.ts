import db from '../config/connection';
// import { User, Thought } from '../models/index';
import cleanDB from './cleanDB';
// import { getRandomReactions, getUsername } from './data';


//TODO: Finish seed file
try {
	await db();
	await cleanDB();

	const thoughts = [];

	for (let i = 0; i < 6; i++) {
		// const reactions = getRandomReactions(5);
		// const username = getUsername();

		thoughts.push(); 
	}
} catch (err) {
	console.error('Error seeding database: ', err);
	process.exit(1);
}
