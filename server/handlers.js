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
  const email = req.body.email;
  
  let result = null;

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

   
      const emailFounded = await db.collection("users").find({ email}).toArray();      
      console.log(emailFounded[0]._id);
     
    

    // we are querying on the _id
    const query = { _id };
    // contains the values that we which to
    const newValues = { $set: { ...req.body } };
    // create a document that sets the plot of the movie

      if(emailFounded.length===0 )
      {
        result =  await db.collection("users").updateOne(query, newValues);

      }
      else{
        console.log("inin");
        console.log(emailFounded[0]._id);
        console.log(_id);
      
        if(emailFounded[0]._id===_id)
        {
          console.log("in ok");
          result = await db.collection("users").updateOne(query, newValues);

        }
      }
     // if(emailFounded && emailFounded[0]._id!==_id)
      
  
    client.close();
    console.log("disconnected!");
    console.log("result",result);

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
        message: "User informations not updated check email",
      });
    }
  } catch (err) {
    console.log(err.stack);
  }
};

/////////////////////////////////////////////////////////

const getBuildings = async (req, res) => {
  const { idOwner } = req.query; //id equal to idOwner
  console.log(idOwner);
  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");

    console.log("connected!");

    const result = await db.collection("buildings").find({idOwner}).toArray();

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
  //getLodgingsByBuilding
  //const { idBuilding } = req.query; //req.params._id;

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
  const building = { 
    _id: req.body.buildingName,
    desc:req.body.buildingDesc,
    status: "active",
    idOwner: req.body.idOwner,
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

    const result = await db.collection("buildings").insertOne(building);


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

    for (let pic of tabPictures1) {
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
////////////////////////////////////////////////////////////////

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
    if (result) {
      res
        .status(200)
        .json({ status: 200, idLodging, data: result, message: {} });
    } else {
      res.status(404).json({
        status: 404,
        idLodging,
        data: undefined,
        message: "Not Found",
      });
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

//////////////////////////////////////////////////////////////////
const getLeaseById = async (req, res) => {
  const { idUser } = req.query; //req.params._id;
  console.log(req.query);

  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    db.collection("leases").findOne({ idUser }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, idUser, data: result, message: {} })
        : res
            .status(404)
            .json({ status: 404, idUser, data: undefined, message: "Not Found" });
      client.close();
    });

    console.log("disconnected!");
  } catch (err) {
    console.log(err.stack);
  }
};

const addLeases = async (req, res) => {
  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    const result = await db.collection("leases").insertOne(req.body);

    client.close();
    console.log("disconnected!");

    if (result) {
      res
        .status(201)
        .json({ status: 201, data: req.body, message: "Lease added" });
    } else {
      res
        .status(500)
        .json({ status: 500, data: req.body, message: err.message });
    }
  } catch (err) {
    console.log(err.stack);
  }
};

//////////////////////////////////////////////////////////////////
const getPaymentByTenantId = async (req, res) => {
  const { _id } = req.query; //req.params._id;
  console.log(req.query);

  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    db.collection("payments").findOne({ _id }, (err, result) => {
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

const addPayments = async (req, res) => {
  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    const result = await db.collection("payments").insertOne(req.body);

    client.close();
    console.log("disconnected!");

    if (result) {
      res
        .status(201)
        .json({ status: 201, data: req.body, message: "Payment added" });
    } else {
      res
        .status(500)
        .json({ status: 500, data: req.body, message: err.message });
    }
  } catch (err) {
    console.log(err.stack);
  }
};

const getLatePayments = async (req, res) => {
  const { idOwner, month } = req.query; //req.params._id;
  console.log(req.query);

  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    const users = await db.collection("users").find({ idOwner }).toArray();
    console.log("Users owner: ", users);

    const userIds = users.map((user) => {
      return user._id;
    });
    console.log("Users owner id only: ", userIds);

    const payments = await db.collection("payments").find({ month }).toArray();
    console.log("Users payments month december: ", payments);

    const d = new Date();

    const paymentMonth = await payments.map((pay) => {
      let year = pay.datePayment.split("-")[0];
      console.log("year", year);
      console.log(pay.idUser);
      console.log(month);
      console.log(d.getMonth().toString());
      console.log(d.getFullYear());
      if (
        userIds.includes(pay.idUser) &&
        month === pay.month &&
        year === d.getFullYear().toString()
      ) {
        return pay;
      } else {
        console.log("pas ok");
        console.log(month === d.getMonth().toString());
      }
    });
    console.log(
      "Users payments month december/year2021/and users: ",
      paymentMonth
    );

    const userIdsPaymentMonth = paymentMonth.map((pay) => {
      return pay.idUser;
    });
    console.log("id only", userIdsPaymentMonth);

    let result = users.map((user) => {
      if (!user._id.includes(userIdsPaymentMonth)) {
        console.log(user);
        return user;
      }
    });
    console.log("User late: ", result);
    result = result.filter((r) => r !== undefined); //fix

    if (result) {
      res.status(200).json({ status: 200, idOwner, data: result, message: {} });
    } else {
      res
        .status(404)
        .json({ status: 404, idOwner, data: undefined, message: "Not Found" });
    }

    client.close();

    console.log("disconnected!");
  } catch (err) {
    console.log(err.stack);
  }
};

//////////////////////////////////////////////////////////////////

const getRequests = async (req, res) => {
  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    let users = await db.collection("users").find().toArray();

    let address = await db.collection("address").find().toArray();

    let requests = await db.collection("requests").find().toArray();
    let tabRequest = [];
   // let result = requests.map((item) => {
      //let user = users.filter((u) => u._id === item.idUser);
     // let addr = address.filter((a) => a._id === user.idLodging);
    //  tabRequest.push(requests);
    //});

    for (let request of requests) {
      let user = users.filter((u) => u._id === request.idUser);
      
      
      tabRequest.push({_id:request._id,
        date: request.date,
        description: request.description,
        idUser: request.idUser,
        idOwner: request.idOwner,
        user:user[0]}
        );
    }

    let result = tabRequest;

    console.log("Result: ",result);

    if (result) {
      res.status(200).json({ status: 200, data: result, message: {} });
    } else {
      res.status(404).json({
        status: 404,
        data: undefined,
        message: "Not Found",
      });
    }
    client.close();

    console.log("disconnected!");
  } catch (err) {
    console.log(err.stack);
  }
};

const addRequests = async (req, res) => {
  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    const result = await db.collection("requests").insertOne(req.body);

    client.close();
    console.log("disconnected!");

    if (result) {
      res
        .status(201)
        .json({ status: 201, data: req.body, message: "Request added" });
    } else {
      res
        .status(500)
        .json({ status: 500, data: req.body, message: err.message });
    }
  } catch (err) {
    console.log(err.stack);
  }
};

//////////////////////////////////////////////////////////////////

const getLodgingsByBuilding = async (req, res) => { 
  const { idBuilding } = req.query; //req.params._id;

  try {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    const db = client.db("Mplex");
    console.log("connected!");

    const lodgings = await db.collection("lodgings").find({idBuilding}).toArray();
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
    console.log(result);
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
  getLeaseById,
  addLeases,
  getPaymentByTenantId,
  addPayments,
  getLatePayments,
  getRequests,
  addRequests,
  getLodgingsByBuilding,
};
