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
        : res.status(404).json({
            status: 404,
            email,
            data: undefined,
            message: "Not Found",
          });
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

const getTenantById = async (req, res) => {
  const { _id } = req.query; //req.params._id;
  console.log(req.query);

  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    db.collection("users").findOne({ _id }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, _id, data: result, message: {} })
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
      res.status(200).json({
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
      res.status(200).json({
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
  //const { _id } = req.query; //req.params._id;

  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    const lodgings = await db.collection("lodgings").find().toArray();
    const addresses = await db.collection("address").find().toArray();
    let result = [];

    lodgings.forEach((lodging) => {
      if (lodging.isAvailable === true) {
        let address = addresses.filter((add) => add._id === lodging.idAddress);
        let lodgingAddress = address[0];

        result.push({
          _id: lodging._id,
          isAvailable: lodging.isAvailable,
          type: lodging.type,
          lodgingAddress,
        });
      }
    });

    console.log("disconnected!");

    if (result) {
      res.status(200).json({
        status: 200,
        data: result,
        message: "Lodging and adress informations ",
      });
    } else {
      res.status(400).json({
        status: 400,
        data: result,
        message: "Lodging error",
      });
    }
  } catch (err) {
    console.log(err.stack);
  }
};

const addLodgings = async (req, res) => {
  // validation of email
  //console.log("array of object lodging: ", req.body);
  const buildiing = {
    _id: "Building1",
    desc: "Building in Anjou area",
    status: "active",
    idOwner: "1000",
  };
  const address1 = {
    _id: uuidv4(),
    address: req.body.address1,
    city: req.body.city1,
    province: req.body.province1,
    postcode: req.body.postcode1,
  };
  console.log("Adresse 1: ", address1);

  const address2 = {
    _id: uuidv4(),
    address: req.body.address2,
    city: req.body.city2,
    province: req.body.province2,
    postcode: req.body.postcode2,
  };
  console.log("Adresse 1: ", address2);

  const address3 = {
    _id: uuidv4(),
    address: req.body.address3,
    city: req.body.city3,
    province: req.body.province3,
    postcode: req.body.postcode3,
  };
  console.log("Adresse 1: ", address3);

  const lodg1 = {
    _id: uuidv4(),
    isAvailable: true,
    type: req.body.lodgType1,
    idAddress: address1._id,
    idBuilding: req.body.buildingName,
  };
  console.log("Lodging 1: ", lodg1);
  const lodg2 = {
    _id: uuidv4(),
    isAvailable: true,
    type: req.body.lodgType2,
    idAddress: address2._id,
    idBuilding: req.body.buildingName,
  };
  console.log("Lodging 2: ", lodg2);
  const lodg3 = {
    _id: uuidv4(),
    isAvailable: true,
    type: req.body.lodgType3,
    idAddress: address3._id,
    idBuilding: req.body.buildingName,
  };
  console.log("Lodging 3: ", lodg3);

  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    const result1 = await db.collection("lodgings").insertOne(lodg1);
    const result2 = await db.collection("lodgings").insertOne(lodg2);
    const result3 = await db.collection("lodgings").insertOne(lodg3);

    const result4 = await db.collection("address").insertOne(address1);
    const result5 = await db.collection("address").insertOne(address2);
    const result6 = await db.collection("address").insertOne(address3);

    const tabPictures1 = req.body.pictures1.split("\n");
    console.log(tabPictures1);
    const tabPictures2 = req.body.pictures2.split("\n");
    console.log(tabPictures2);
    const tabPictures3 = req.body.pictures3.split("\n");
    console.log(tabPictures3);

    for (let pic of tabPictures2) {
      //tabPictures1.forEach((pic) => {
      let picture = {
        _id: uuidv4(),
        imageUrl: pic,
        idLodging: lodg1._id,
      };
      let resultpic = await db.collection("pictures").insertOne(picture);
      //});
    }

    //tabPictures2.forEach(async (pic) => {
    for (let pic of tabPictures2) {
      let picture = {
        _id: uuidv4(),
        imageUrl: pic,
        idLodging: lodg2._id,
      };
      let resultpic = await db.collection("pictures").insertOne(picture);
      //});
    }

    //tabPictures3.forEach(async (pic) => {
    for (let pic of tabPictures3) {
      let picture = {
        _id: uuidv4(),
        imageUrl: pic,
        idLodging: lodg3._id,
      };
      let resultpic = await db.collection("pictures").insertOne(picture);
      //});
    }

    client.close();
    console.log("disconnected!");

    if (result1 && result2 && result3) {
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
      res.status(200).json({
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
      res.status(200).json({
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

const getPictures = async (req, res) => {
  const { idLodging } = req.query; //req.params._id;
  console.log(req.query);

  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    let result = await db.collection("pictures").find({ idLodging }).toArray();
     if(result) {res.status(200).json({ status: 200, idLodging, data: result, message: {} })}
      else{
            res.status(404)
            .json({ status: 404, idLodging, data: undefined, message: "Not Found" });
      }     
      client.close();
    

    console.log("disconnected!");
  } catch (err) {
    console.log(err.stack);
  }
};

const addPictures = async (req, res) => {
  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    const result = await db.collection("pictures").insertOne(req.body);

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

module.exports = {
  getUser,
  getTenants,
  getTenantById,
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
  getPictures,
  addPictures,
};