const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'vendingMachine';
const collectionName = 'sodas';

// Document Directory Info
const sodaDocsLocation = path.join(__dirname, 'sodaDocuments/');

async function main() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
  } catch(error) {
    console.log('There was an error while connecting to the mongo server', error);
  }

  const db = client.db(dbName);
  const sodaCollection = db.collection(collectionName);

  // Drop the soda collection
  sodaCollection.drop();

  const sodaFileNameList = fs.readdirSync(sodaDocsLocation);
  const sodaDocContents = [];

  // Store all files in an array
  sodaFileNameList.forEach(fileName => {
    const fullFilePath = path.join(sodaDocsLocation, fileName);
    sodaDocContents.push(JSON.parse(fs.readFileSync(fullFilePath, { encoding: 'utf-8' })));
  });

  // Push all files to mongo
  try {
    await sodaCollection.insertMany(sodaDocContents);
  } catch (error) {
    console.log('There was an error while inserting the documents into mongo', error);
  }

  return 'Initialization Script Complete';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());