# ColaCo Vending Machine

Thank you for checking out the ColaCo vending machine!

## Prerequisites
- Nodejs: v18.15.0 (lts/hydrogen)
- Mongodb Community: v6.0 (Untested but VendingMachine should be compatible with earlier versions)

## Configuring Mongo Database
1. Ensure that have mongodb community installed.
2. Ensure that you do not have authentication enabled on your mongodb instance as it is not supported on this application.
3. Ensure that your mongodb is running on host `localhost` and port `27017`. If your mongo can not run on those values, update the MONGO_HOST and MONGO_PORT values in ./backend/.env.
4. Navigate to the ./backend directory of this project.
5. Run `npm install` to install all of the backend dependencies.
6. Navigate to the ./backend/dbInit and run `node initializeMongo.js`.

## Starting Development Servers

### Backend Express Server
1. Open a new terminal window.
2. Navigate to the ./backend directory of this project.
3. Run `npm install` to install all of the dependencies.
4. Run `node server.js` to launch the express server.

### Frontend Angular Server
1. Open a new terminal window
2. Navigate to the ./frontend directory of this project.
3. Run `npm install` to install all of the dependencies.
4. Run `npm run start` to launch the angular development server.
5. Navigate to `http://localhost:4200/`.

## API Documentation
If using default settings at ./backend/.env, all APIs will be accessible at `http://localhost:3000`.

A postman collection is also available at `./Vending Machine.postman_collection.json`.

### User Routes

#### Login
Returns information about a user given their name. If a user does not exist, they will be created with default values.

- Verb: POST
- Endpoint: /api/customer/login
- Example Body
```
{
    "name": "Kevin"
}
```
- Example Response
```
{
    "_id": "651a3b25fa598722259ed028",
    "name": "Kevin",
    "bankBalance": 5024
}
```

#### Get Sodas
Returns information about all of the sodas that are currently available in the vending machine.

- Verb: GET
- Endpoint: /api/customer/sodas
- Example Response:
```
[
    {
        "_id": "651a395329e0b2236f3dfb78",
        "productName": "Cola",
        "description": "An basic no nonsense cola that is the perfect pick me up for any occasion.",
        "cost": 1,
        "maximumQuantity": 200,
        "currentQuantity": 20
    }
]
```

#### Purchase Soda
Places an order for a soda if a user has enough money and the soda is still in stock

- Verb: PUT
- Endpoint: /api/customer/sodas
- Example Body:
```
{
    "customerId": "6519cd2aeb48246643b087ae",
    "sodaId": "65179033bbfa47089b111ee9"
}
```
- Example Response:
```
{
    "productName": "Cola",
    "description": "An basic no nonsense cola that is the perfect pick me up for any occasion.",
    "purchasePrice": 4,
    "purchaseDate": "Mon, 02 Oct 2023 03:48:37 GMT",
    "purchasingUser": "Kevin",
    "newBankBalance": 5020
}
```

### Admin Routes

#### Set Soda Cost
Sets the cost for a soda given a sodaId and a newCost

- Verb: PUT
- Endpoint: /api/admin/soda-cost
- Example Body:
```
{
    "newCost": 4,
    "sodaId": "651a395329e0b2236f3dfb78"
}
```
- Example Response:
```
{
    "newCost": 4
}
```

#### Restock Soda
Attempts to restock a given soda with a given numberToAttemptRestock. Unfortunately, because soda is difficult to come by at ColaCo, a random number to restock will be actually entered into the inventory that is between 1 and the given value for numberToAttemptRestock.

- Verb: POST
- Endpoint: /api/admin/restock-soda
- Example Body:
```
{
    "sodaId": "651a395329e0b2236f3dfb78",
    "numberToAttemptRestock": 6
}
```
- Example Response
```
{
    "newQuantity": 34
}
```