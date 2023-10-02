const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Environment variables
const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || 27017;

// Connection URL
const url = `mongodb://${mongoHost}:${mongoPort}`;
const client = new MongoClient(url);

// Database Name
const dbName = 'vendingMachine';
const sodasCollectionName = 'sodas';
const usersCollectionName = 'users';

// Document Directory Info
const sodaDocsLocation = path.join(__dirname, 'sodas/');

async function main() {
  try {
    await client.connect();
    console.log('Successfully connected to the mongo server');
  } catch(error) {
    console.log('There was an error while connecting to the mongo server', error);
    return;
  }

  const db = client.db(dbName);
  const sodasCollection = db.collection(sodasCollectionName);
  const usersCollection = db.collection(usersCollectionName);

  // Drop the collections safely
  try {
    await sodasCollection.drop();
   } catch (error) {
    console.log('Unable to drop sodas collection as it likely does not exist yet. Likely no issue present.')
  }

  try {
    await usersCollection.drop();
   } catch (error) {
    console.log('Unable to drop users collection as it likely does not exist yet. Likely no issue present.')
  }

  const sodaFileNameList = fs.readdirSync(sodaDocsLocation);
  const sodaDocContents = [];

  // Store all files in an array
  sodaFileNameList.forEach(fileName => {
    const fullFilePath = path.join(sodaDocsLocation, fileName);
    sodaDocContents.push(JSON.parse(fs.readFileSync(fullFilePath, { encoding: 'utf-8' })));
  });

  // Push all files to mongo
  try {
    await sodasCollection.insertMany(sodaDocContents);
  } catch (error) {
    console.log('There was an error while inserting the documents into mongo', error);
    return;
  }

  return 'Initialization Script Complete';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());