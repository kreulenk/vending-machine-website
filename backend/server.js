const express = require('express');

const cusomterRoutes = require('./routes/customerRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 
               "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/customer', cusomterRoutes); 

app.listen(PORT, (error) => {
    if (error) {
        console.log("There was an error starting the service", error);
    } else {
        console.log("Server listening on port 3000");
    }
});