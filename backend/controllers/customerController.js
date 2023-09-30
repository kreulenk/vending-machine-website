// Methods to be executed on routes
const getSodaInventory = (req, res) => {
	console.log(req.query)
	res.send("Hello, Welcome to our Page");
}

// Export of all methods as object
module.exports = {
	getSodaInventory
}
