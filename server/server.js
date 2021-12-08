"use strict";
const {
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
} = require("./handlers");

const path = require("path");
const express = require("express");
const morgan = require("morgan");

const PORT = 8000;

express()
  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  ////endpoints

  .get("/hello", (req, res) => {
    res.status(200).json({ hi: "hi" });
  })

  /////////////////////////////////////////////////////////

  //retrieve user information
  .get("/api/user", getUser)

  //retrieve all tenants of specific owner
  .get("/api/tenants", getTenants)

  //create a new building
  .post("/api/tenant/", addTenants)

  //update tenant informations
  .put("/api/tenant/", updateTenant)

  /////////////////////////////////////////////////////////

  //retrieve all buildings of specific owner
  .get("/api/buildings", getBuildings)

  //create a new building
  .post("/api/building/", addBuildings)

  //update building informations
  .put("/api/building/", updateBuilding)

  /////////////////////////////////////////////////////////

  //retrieve all buildings of specific owner
  .get("/api/lodgings", getLodgings)

  //create a new lodging
  .post("/api/lodging/", addLodgings)

  //update building informations
  .put("/api/lodging/", updateLodging)

  /////////////////////////////////////////////////////////

  //retrieve an adresss from specific lodging
  .get("/api/adresses", getAddress)

  //create a new address for new lodging
  .post("/api/address/", addAddress)

  //update address informations
  .put("/api/adress/", updateAddress)

  /////////////////////////////////////////////////////////

  .listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
  });
