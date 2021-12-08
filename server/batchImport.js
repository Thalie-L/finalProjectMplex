const { buildings, lodgings, address, pictures, users } = require("./data/data.js");

const { MongoClient } = require("mongodb");

//In order to access the database, we need the uri that we saved in the .env file.
require("dotenv").config();
const { MONGO_URI } = process.env;

//console.log(MONGO_URI);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    const results = await db.collection("buildings").insertMany(buildings);
    const results2 = await db.collection("lodgings").insertMany(lodgings);
    const results3 = await db.collection("address").insertMany(address);
    const results4 = await db.collection("pictures").insertMany(pictures);
    const results5 = await db.collection("users").insertMany(users);

    if (results && results2 && results3 && results4 && results5) {
      console.log("Data have been added properly!!");
    } else {
      console.log("No data added in database!!");
    }

    client.close();
    console.log("disconnected!");
  } catch (err) {
    console.log(err.stack);
  }
};

batchImport();
