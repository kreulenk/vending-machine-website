const { mongoDbConnection } = require('../server.js');
const { ObjectId } = require('mongodb');

// Database Info
const sodaCollectionName = 'sodas';
const sodaCollection = mongoDbConnection.collection(sodaCollectionName);

/**
 * Updates the cost of a soda
 */
const updateSodaCost = (async (req, res) => {
    const newCost = req.body?.newCost;
	const sodaId = req.body?.sodaId;

	if (!newCost || typeof(newCost) != 'number' || newCost <= 0) {
		res.status(400);
		res.send('No valid newCost was provided. newCost must be a number that is greater than 0.');
		return;
	}

	if (!sodaId) {
		res.status(400);
		res.send('You need to include the sodaId of the soda that is getting a price update.');
		return;
	}

	let sodaToUpdate;
	try {
        sodaToUpdate = await sodaCollection.findOneAndUpdate({ _id: new ObjectId(sodaId) }, { $set: { cost: newCost }});
	} catch(error) {
		console.log(error);
        res.status(500);
		res.send('An error occurred while setting the new soda cost.');
		return;
	}

	if (!sodaToUpdate) {
		res.status(400);
		res.send('The provided sodaId does not exist.');
		return;
	}

	res.send({ newCost });
});

const restockSoda = (async (req, res) => {
	const sodaId = req.body?.sodaId;
	const numberToAttemptRestock = req.body?.numberToAttemptRestock;

	if (!numberToAttemptRestock || typeof(numberToAttemptRestock) != 'number' || numberToAttemptRestock <= 0) {
		res.status(400);
		res.send('No valid numberToAttemptRestock was provided. numberToAttemptRestock must be a number that is greater than 0.');
		return;
	}

	if (!sodaId) {
		res.status(400);
		res.send('You need to include the sodaId of the soda that is getting a price update.');
		return;
	}

	let sodaToRestock;
	try {
		sodaToRestock = await sodaCollection.findOne({ _id: new ObjectId(sodaId) });
	} catch(error) {
		console.log(error);
		res.status(500);
		res.send('An error occurred while getting the soda that is being restocked');
		return;
	}

	if (!sodaToRestock) {
		res.status(400);
		res.send('The provided sodaId does not exist.');
		return;
	}

	// If we are attempting to add more sodas than the maximum quantity
	if (numberToAttemptRestock + sodaToRestock.currentQuantity > sodaToRestock.maximumQuantity) {
		res.status(400);
		res.send(`You are attempting to restock more soda than the vending machine can handle`);
		return;
	}

	const newQuantity = sodaToRestock.currentQuantity + Math.ceil(Math.random() * numberToAttemptRestock);

	let newSodaRecord;
	try {
		newSodaRecord = await sodaCollection.findOneAndUpdate({ _id: new ObjectId(sodaId) }, { $set: { currentQuantity: newQuantity}});
	} catch(error) {
		console.log(error);
        res.status(500);
		res.send('An error occurred while updating the soda quantity');
		return;
	}
	res.send({ newQuantity: newQuantity });
});


// Export of all methods as object
module.exports = { updateSodaCost, restockSoda }
