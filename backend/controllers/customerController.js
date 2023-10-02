const { mongoDbConnection } = require('../server.js');
const { ObjectId } = require('mongodb');

// Database Info
const sodaCollectionName = 'sodas';
const userCollectionName = 'users';
const sodaCollection = mongoDbConnection.collection(sodaCollectionName);
const userCollection = mongoDbConnection.collection(userCollectionName);

/**
 * Gets all of the sodas that are available in the database
 */
const getSodaInventory = (async (req, res) => {
	let allSodas;
	try {
		allSodas = await sodaCollection.find({}).toArray();
	} catch(error) {
		res.send('An error occurred while fetching the sodas.');
		return;
	}
	res.send(allSodas);
});

const purchaseSoda = (async (req, res) => {
	const customerId = req.body?.customerId;
	const sodaId = req.body?.sodaId;

	if (!customerId) {
		res.status(400);
		res.send('You need to include the customerId of the purchaser.');
		return;
	}

	if (!sodaId) {
		res.status(400);
		res.send('You need to include the sodaId of the soda that is being purchased.');
		return;
	}

	let sodaToPurchase;
	try {
		sodaToPurchase = await sodaCollection.findOne({ _id: new ObjectId(sodaId) });
	} catch(error) {
		console.log(error);
		res.status(500);
		res.send('An error occurred while purchasing the soda.');
		return;
	}

	if (!sodaToPurchase) {
		res.status(400);
		res.send('The provided sodaId does not exist.');
		return;
	}

	// First verify that there is soda left in the vending machine
	if (sodaToPurchase.currentQuantity <= 0) {
		res.status(400);
		res.send('The soda you attempted to purchase is not in stock.');
		return;
	}

	let purchasingCustomer;
	try {
		purchasingCustomer = await userCollection.findOne({ _id: new ObjectId(customerId) });
	} catch(error) {
		console.log(error);
		res.status(500);
		res.send('An error occurred while verifying that the customer exists.');
		return;
	}

	if (!purchasingCustomer) {
		res.status(400);
		res.send('The provided customerId does not exist.');
		return;
	}

	// Verify that the user has enough money to make this purchase
	if (purchasingCustomer.bankBalance < sodaToPurchase.cost) {
		res.status(400);
		res.send('You do not have sufficient funds to purchase this soda.');
		return;
	}

	// Update soda and user documents at once in a trasaction
	const session = mongoDbConnection.client.startSession();
	try {
		await session.withTransaction(async () => {
		  await sodaCollection.findOneAndUpdate({ _id: new ObjectId(sodaId) }, { $set: { currentQuantity: sodaToPurchase.currentQuantity - 1 }});
		  await userCollection.findOneAndUpdate({ _id: new ObjectId(customerId) }, {$set: { bankBalance: purchasingCustomer.bankBalance - sodaToPurchase.cost }});
		});
	  } catch(error) {
		console.log(error);
		res.status(500);
		res.send('An error occurred while purchasing the soda.');
		return;
	  } finally {
		await session.endSession();
	  }

	res.send({
		productName: sodaToPurchase.productName,
		description: sodaToPurchase.description,
		purchasePrice: sodaToPurchase.cost,
		purchaseDate: new Date().toUTCString(),
		purchasingUser: purchasingCustomer.name,
		newBankBalance: purchasingCustomer.bankBalance - sodaToPurchase.cost
	});
	return;
});

/**
 * Used to get a user into the vending machine. Does not require any credentials
 * If a user already exists, that user will be returned.
 * If a user is new, they will be entered into the db and then returned
 * 
 * Takes in username as a request body parameter
 */
const getUser = (async(req, res) => {
	const name = req.body?.name;

	if (!name) {
		res.status(400);
		res.send('You need to include a username.');
		return;
	}

	// First determine if the user already exists in our database
	let userDoc;
	try {
		userDoc = await userCollection.findOne({ name });
	} catch(error) {
		res.status(500);
		res.send('An error occurred while fetching the user.');
		return;
	}

	// If the user already exists return that user
	if (userDoc) {
		res.send(userDoc);
		return;
	}

	// If the user does not yet exist, enter them into the database
	const newUserDoc = { name, bankBalance: 50 };
	try {
		await userCollection.insertOne(newUserDoc);
	} catch(error) {
		res.status(500);
		res.send('An error occurred while creating a new user.');
		return;
	}

	res.send(newUserDoc);
});

// Export of all methods as object
module.exports = { getSodaInventory, getUser, purchaseSoda }
