const { mongoDbConnection } = require('../server.js');

// Database Info
const sodaCollectionName = 'sodas';
const userCollectionName = 'users';

// Mongo connection information
const sodaCollection = mongoDbConnection.collection(sodaCollectionName);
const userCollection = mongoDbConnection.collection(userCollectionName);

// API Functions

/**
 * Gets all of the sodas that are available in the database
 */
const getSodaInventory = (async (req, res) => {
	let allSodas;
	try {
		allSodas = await sodaCollection.find({}).toArray();
	} catch(error) {
		res.send('An error occurred while fetching the sodas!');
		return;
	}
	res.send(allSodas);
});

/**
 * Used to log a user into the vending machine. Does not require any credentials
 * If a user already exists, that user will be returned.
 * If a user is new, they will be entered into the db and then returned
 */
const loginUser = (async(req, res) => {
	const username = req.body?.username;

	if (!username) {
		res.status(400);
		res.send('You need to include a username to log in.');
		return;
	}

	// First determine if the user already exists in our database
	let userDoc;
	try {
		userDoc = await userCollection.findOne({ username });
	} catch(error) {
		res.status(500);
		res.send('An error occurred while fetching the user!');
		return;
	}

	// If the user already exists return that user
	if (userDoc) {
		res.send(userDoc);
		return;
	}

	// If the user does not yet exist, enter them into the database
	const newUserDoc = { username, bankBalance: 50 };
	try {
		await userCollection.insertOne(newUserDoc);
	} catch(error) {
		res.status(500);
		res.send('An error occurred while creating a new user!');
		return;
	}

	res.send(newUserDoc);
});

// Export of all methods as object
module.exports = { getSodaInventory, loginUser }
