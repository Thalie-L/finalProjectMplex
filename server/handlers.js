"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");

//In order to access the database, we need the uri that we saved in the .env file.
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};



const getUser = async (req, res) => {
    const { email } = req.query; //req.params._id;

    try {
      // creates a new client
      const client = new MongoClient(MONGO_URI, options);
  
      // connect to the client
      await client.connect();
      const db = client.db("Mplex");
      console.log("connected!");
  
      db.collection("users").findOne({ email }, (err, result) => {
        result
          ? res
              .status(200)
              .json({ status: 200, email, data: result, message: {} })
          : res
              .status(404)
              .json({ status: 404, email, data: undefined, message: "Not Found" });
        client.close();
      });
  
      console.log("disconnected!");
    } catch (err) {
      console.log(err.stack);
    }
  };


const getTenants = async (req, res) => {
  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");

    console.log("connected!");

    const result = await db.collection("users").find().toArray();
    let users = result.filter((user) => {
      return user.role !== "Admin";
    });

    if (result) {
      res.status(201).json({ status: 201, data: users, message: {} });
    } else {
      res
        .status(400)
        .json({ status: 404, data: {}, message: "No tenants founded" });
    }

    client.close();
    console.log("disconnected!");
  } catch (err) {
    console.log("catch", err.stack);
  }
};


const addTenants = async (req, res) => {
  // validation of email
  if (!req.body.email.includes("@")) {
    return res
      .status(400)
      .json({ status: "error", data: req.body, message: "wrong-format-email" });
  }

  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    const result = await db.collection("users").insertOne(req.body);

    client.close();
    console.log("disconnected!");

    if (result) {
      res
        .status(201)
        .json({ status: 201, data: req.body, message: "Tenants added" });
    } else {
      res
        .status(500)
        .json({ status: 500, data: req.body, message: err.message });
    }
  } catch (err) {
    console.log(err.stack);
  }
};

const updateTenant = async (req, res) => {
  const _id = req.body._id;

  const keys = Object.keys(req.body);

  console.log(keys[0]);
  if (keys.length > 6 || keys[0] !== "_id") {
    return res
      .status(400)
      .json({ status: 204, data: req.body, message: "Resquest body is wrong" });
  }

  //console.log(keys);

  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    // we are querying on the _id
    const query = { _id };
    // contains the values that we which to
    const newValues = { $set: { ...req.body } };
    // create a document that sets the plot of the movie

    const result = await db.collection("users").updateOne(query, newValues);
    client.close();
    console.log("disconnected!");

    if (result) {
      res
        .status(200)
        .json({
          status: 204,
          data: req.body,
          message: "Tenants informations updated",
        });
    } else {
      res.status(400).json({
        status: 400,
        data: req.body,
        message: "Tenant not updated",
      });
    }
  } catch (err) {
    console.log(err.stack);
  }
};

/////////////////////////////////////////////////////////

const getBuildings = async (req, res) => {
    try {
      // creates a new client
      const client = new MongoClient(MONGO_URI, options);
  
      // connect to the client
      await client.connect();
      const db = client.db("Mplex");
  
      console.log("connected!");
  
      const result = await db.collection("buildings").find().toArray();
     
  
      if (result) {
        res.status(201).json({ status: 201, data: result, message: {} });
      } else {
        res
          .status(400)
          .json({ status: 404, data: {}, message: "No buildings founded" });
      }
  
      client.close();
      console.log("disconnected!");
    } catch (err) {
      console.log("catch", err.stack);
    }
  };
  
  const addBuildings = async (req, res) => {
    // validation of email
    /*if (!req.body.email.includes("@")) {
      return res
        .status(400)
        .json({ status: "error", data: req.body, message: "wrong-format-email" });
    }*/
  
    try {
      // creates a new client
      const client = new MongoClient(MONGO_URI, options);
  
      // connect to the client
      await client.connect();
      const db = client.db("Mplex");
      console.log("connected!");
  
      const result = await db.collection("buildings").insertOne(req.body);
  
      client.close();
      console.log("disconnected!");
  
      if (result) {
        res
          .status(201)
          .json({ status: 201, data: req.body, message: "Buildings added" });
      } else {
        res
          .status(500)
          .json({ status: 500, data: req.body, message: err.message });
      }
    } catch (err) {
      console.log(err.stack);
    }
  };
  
  const updateBuilding = async (req, res) => {
    const _id = req.body._id;
  
    const keys = Object.keys(req.body);
  
    console.log(keys[0]);
    if (keys.length > 2 || keys[0] !== "_id") {
      return res
        .status(400)
        .json({ status: 204, data: req.body, message: "Resquest body is wrong" });
    }
  
    //console.log(keys);
  
    try {
      // creates a new client
      const client = new MongoClient(MONGO_URI, options);
  
      // connect to the client
      await client.connect();
      const db = client.db("Mplex");
      console.log("connected!");
  
      // we are querying on the _id
      const query = { _id };
      // contains the values that we which to
      const newValues = { $set: { ...req.body } };
      // create a document that sets the plot of the movie
  
      const result = await db.collection("buildings").updateOne(query, newValues);
      client.close();
      console.log("disconnected!");
  
      if (result) {
        res
          .status(200)
          .json({
            status: 204,
            data: req.body,
            message: "Building informations updated",
          });
      } else {
        res.status(400).json({
          status: 400,
          data: req.body,
          message: "Building not updated",
        });
      }
    } catch (err) {
      console.log(err.stack);
    }
  };

  /////////////////////////////////////////////////////////

  const getLodgings = async (req, res) => {
    const { _id } = req.query; //req.params._id;

  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    db.collection("lodgings").find({ idBuilding:req.query }, (err, result) => {
      result
        ? res
            .status(200)
            .json({ status: 200, _id, data: result.seats, message: {} })
        : res
            .status(404)
            .json({ status: 404, _id, data: undefined, message: "Not Found" });
      client.close();
    });

    console.log("disconnected!");
  } catch (err) {
    console.log(err.stack);
  }
  };
  
  const addLodgings = async (req, res) => {
    // validation of email
  
  
    try {
      // creates a new client
      const client = new MongoClient(MONGO_URI, options);
  
      // connect to the client
      await client.connect();
      const db = client.db("Mplex");
      console.log("connected!");
  
      const result = await db.collection("lodgings").insertOne(req.body);
  
      client.close();
      console.log("disconnected!");
  
      if (result) {
        res
          .status(201)
          .json({ status: 201, data: req.body, message: "Lodgings added" });
      } else {
        res
          .status(500)
          .json({ status: 500, data: req.body, message: err.message });
      }
    } catch (err) {
      console.log(err.stack);
    }
  };
  
  const updateLodging = async (req, res) => {
    const _id = req.body._id;
  
    const keys = Object.keys(req.body);
  
    console.log(keys[0]);
    if (keys.length > 5 || keys[0] !== "_id") {
      return res
        .status(400)
        .json({ status: 204, data: req.body, message: "Resquest body is wrong" });
    }
  
    //console.log(keys);
  
    try {
      // creates a new client
      const client = new MongoClient(MONGO_URI, options);
  
      // connect to the client
      await client.connect();
      const db = client.db("Mplex");
      console.log("connected!");
  
      // we are querying on the _id
      const query = { _id };
      // contains the values that we which to
      const newValues = { $set: { ...req.body } };
      // create a document that sets the plot of the movie
  
      const result = await db.collection("lodgings").updateOne(query, newValues);
      client.close();
      console.log("disconnected!");
  
      if (result) {
        res
          .status(200)
          .json({
            status: 204,
            data: req.body,
            message: "Lodgings informations updated",
          });
      } else {
        res.status(400).json({
          status: 400,
          data: req.body,
          message: "Lodging not updated",
        });
      }
    } catch (err) {
      console.log(err.stack);
    }
  };

  /////////////////////////////////////////////////////////

  const getAddress = async (req, res) => {
    try {
      // creates a new client
      const client = new MongoClient(MONGO_URI, options);
  
      // connect to the client
      await client.connect();
      const db = client.db("Mplex");
  
      console.log("connected!");
  
      const result = await db.collection("address").find().toArray();
     
  
      if (result) {
        res.status(201).json({ status: 201, data: results, message: {} });
      } else {
        res
          .status(400)
          .json({ status: 404, data: {}, message: "No address founded" });
      }
  
      client.close();
      console.log("disconnected!");
    } catch (err) {
      console.log("catch", err.stack);
    }
  };
  
  const addAddress = async (req, res) => {    
  
    try {
      // creates a new client
      const client = new MongoClient(MONGO_URI, options);
  
      // connect to the client
      await client.connect();
      const db = client.db("Mplex");
      console.log("connected!");
  
      const result = await db.collection("address").insertOne(req.body);
  
      client.close();
      console.log("disconnected!");
  
      if (result) {
        res
          .status(201)
          .json({ status: 201, data: req.body, message: "Address added" });
      } else {
        res
          .status(500)
          .json({ status: 500, data: req.body, message: err.message });
      }
    } catch (err) {
      console.log(err.stack);
    }
  };
  
  const updateAddress = async (req, res) => {
    const _id = req.body._id;
  
    const keys = Object.keys(req.body);
  
    console.log(keys[0]);
    if (keys.length > 5 || keys[0] !== "_id") {
      return res
        .status(400)
        .json({ status: 204, data: req.body, message: "Resquest body is wrong" });
    }      
  
    try {
      // creates a new client
      const client = new MongoClient(MONGO_URI, options);
  
      // connect to the client
      await client.connect();
      const db = client.db("Mplex");
      console.log("connected!");
  
      // we are querying on the _id
      const query = { _id };
      // contains the values that we which to
      const newValues = { $set: { ...req.body } };
      // create a document that sets the plot of the movie
  
      const result = await db.collection("address").updateOne(query, newValues);
      client.close();
      console.log("disconnected!");
  
      if (result) {
        res
          .status(200)
          .json({
            status: 204,
            data: req.body,
            message: "Address informations updated",
          });
      } else {
        res.status(400).json({
          status: 400,
          data: req.body,
          message: "Address not updated",
        });
      }
    } catch (err) {
      console.log(err.stack);
    }
  };

module.exports = {
  getUser,
  getTenants,  
  addTenants,
  updateTenant,
  getBuildings,
  addBuildings,
  updateBuilding,
  getLodgings,
  addLodgings,
  updateLodging,
  getAddress,
  addAddress,
  updateAddress,
};
