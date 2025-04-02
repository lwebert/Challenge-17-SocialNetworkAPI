const names = [
	'Aaran',
	'Aaren',
	'Aarez',
	'Aarman',
	'Aaron',
	'Aaron-James',
	'Aarron',
	'Aaryan',
	'Aaryn',
	'Aayan',
	'Aazaan',
	'Abaan',
	'Abbas',
	'Abdallah',
	'Abdalroof',
	'Abdihakim',
	'Abdirahman',
	'Abdisalam',
	'Abdul',
	'Abdul-Aziz',
	'Abdulbasir',
	'Abdulkadir',
	'Abdulkarem',
	'Smith',
	'Jones',
	'Coollastname',
	'enter_name_here',
	'Ze',
	'Zechariah',
	'Zeek',
	'Zeeshan',
	'Zeid',
	'Zein',
	'Zen',
	'Zendel',
	'Zenith',
	'Zennon',
	'Zeph',
	'Zerah',
	'Zhen',
	'Zhi',
	'Zhong',
	'Zhuo',
	'Zi',
	'Zidane',
	'Zijie',
	'Zinedine',
	'Zion',
	'Zishan',
	'Ziya',
	'Ziyaan',
	'Zohaib',
	'Zohair',
	'Zoubaeir',
	'Zubair',
	'Zubayr',
	'Zuriel',
	'Xander',
	'Jared',
	'Courtney',
	'Gillian',
	'Clark',
	'Jared',
	'Grace',
	'Kelsey',
	'Tamar',
	'Alex',
	'Mark',
	'Tamar',
	'Farish',
	'Sarah',
	'Nathaniel',
	'Parker',
];

const thoughts = [
	"Life is what happens when you're busy making other plans.",
	'The purpose of our lives is to be happy.',
	'Get busy living or get busy dying.',
	'You have within you right now, everything you need to deal with whatever the world can throw at you.',
	"Believe you can and you're halfway there.",
	'The only impossible journey is the one you never begin.',
	'Act as if what you do makes a difference. It does.',
	'Success is not how high you have climbed, but how you make a positive difference to the world.',
	'What lies behind us and what lies before us are tiny matters compared to what lies within us.',
	'You are never too old to set another goal or to dream a new dream.',
];

const reactions = [
	'I completely agree!',
	'This is so insightful!',
	'I never thought about it this way.',
	'Absolutely love this!',
	'This resonates with me.',
	'Interesting perspective!',
	'I can relate to this.',
	'Thanks for sharing!',
	'This is thought-provoking.',
	'I have mixed feelings about this.',
];

//Get a random item given an array (similar to module 17 activity 28)
const getRandomArrItem = (arr: any) =>
	arr[Math.floor(Math.random() * arr.length)];

//Get a random name
export const getUserName = () => {
	return getRandomArrItem(names);
};

// export const getRandomFriends = () => {
// 	const friends = [];
// 	for (let i =0; i< 3; i++) {
// 		friends.push({
// 			username: getUserName(),
// 		})
// 	}
// 	return friends
// }

//Generate random thought we can assign to a user
// Thoughts = thoughtText, createdAt, username, reactions
export const getRandomThoughts = (int: number) => {
	const thoughtData = [];
	for (let i = 0; i < int; i++) {
		thoughtData.push({
			thoughtText: getRandomArrItem(thoughts),
			// username: getUserName(),
			reactions: [...getThoughtReactions(2)],
		});
	}
	return thoughtData;
};

//Generate random reactions we can assign to a thought
// Reactions = reactionId, reactionBody, username, createdAt
export const getThoughtReactions = (int: number) => {
	if (int === 1) {
		return getRandomArrItem(reactions);
	}
	let reactionData = [];
	for (let i = 0; i < int; i++) {
		reactionData.push({
			reactionBody: getRandomArrItem(reactions),
			username: getUserName(),
		});
	}
	return reactionData;
};
