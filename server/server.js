"use strict";
const {
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
} = require("./handlers");

const path = require("path");
const express = require("express");
const morgan = require("morgan");

//for sending mail
require("dotenv").config();
let nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

let transporter = nodemailer.createTransport({
  //host:"smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});



transporter.verify(function (err, success) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is ready to take the emails");
  }
});

const PORT = 8000;

express()
  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  //for sending mail
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

  ////endpoints

  .get("/hello", (req, res) => {
    res.status(200).json({ hi: "hi" });
  })

  /////////////////////////////////////////////////////////

  //retrieve user information
  .get("/api/user", getUser)

  //retrieve all tenants of specific owner
  .get("/api/tenants", getTenants)

  // get single tenant by id
  .get("/api/tenant", getTenantById)

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

  //retrieve pictures from specific lodging
  .get("/api/pictures", getPictures)

  //create a new pictures
  .post("/api/pictures/", addPictures)

  /////////////////////////////////////////////////////////

  //retrieve lease for specific tenant
  .get("/api/lease", getLeaseById)

  //create a new lease
  .post("/api/leases/", addLeases)

  /////////////////////////////////////////////////////////

  //retrieve payment for specific tenant
  .get("/api/payment", getPaymentByTenantId)

  //create a new payment
  .post("/api/payments/", addPayments)

  //retrieve all tenant informations that as late payment  ex: ?idOwner=1000&month=11
  .get("/api/payment/tenants", getLatePayments)

  /////////////////////////////////////////////////////////

  //retrieve requests from tenants
  .get("/api/requests", getRequests)

  //create a new request
  .post("/api/requests/", addRequests)

  /////////////////////////////////////////////////////////

  //sent mail about lease
  .post("/mail", (req, res, next) => {
    let email = req.body.email;
    let message = req.body.message;
    let subject = req.body.subject;
    let name = req.body.name;

    const mailOptions = {
      from: name,
      to: email,
      subject: subject,
      html: `${name}<noreply><br/>${message}`,
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        res
          .status(400)
          .json({ status: 400, data: req.body, message: err.message });
        console.log("Error message not sent");
      } else {
        res
          .status(200)
          .json({
            status: 200,
            data: req.body,
            message: "Success message sent",
          });
        console.log("Success message sent!!!" + data.response);
      }
    });
  })

  .listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
  });
