const { MongoClient } = require('mongodb');
const express = require('express');
require('dotenv').config();

// Environment variables
const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || 27017;
const expressPort = process.env.EXPRESS_PORT || 3000;

// Connection URL
const url = `mongodb://${mongoHost}:${mongoPort}`;
const dbName = 'vendingMachine';
const client = new MongoClient(url);
const mongoDbConnection = client.db(dbName);

const app = express();

mongoDbConnection.client.connect().then((test) => {
    app.use(express.json());

    // handling CORS
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin",
            "http://localhost:4200");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // Routes configurations
    const cusomterRoutes = require('./routes/customerRoutes.js');
    app.use('/customer', cusomterRoutes);

    app.listen(expressPort, (error) => {
        if (error) {
            console.log("There was an error starting the service", error);
        } else {
            console.log(`Server listening on port ${expressPort}`);
        }
    });
}).catch(error => {
    console.log('There was an error while connecting to the mongo server', error);
});

module.exports = { mongoDbConnection };