const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const server = express();
const mongoClient = new MongoClient(
  "mongodb+srv://titas:TgxLVYkSAXc0iLQx@db.xoxi5ar.mongodb.net/"
);
server.use(express.json());
server.use(cors());

server.get("/rental-cars", async (_, res) => {
  try {
    const mongoCluster = await mongoClient.connect();
    const rentalCars = await mongoCluster
      .db("Rental")
      .collection("RentalCars")
      .find()
      .toArray();
    mongoCluster.close();

    res.send(rentalCars);
  } catch (error) {
    res.status(500).end();
  }
});

server.post("/register-car", async (req, res) => {
  try {
    const payload = req.body;
    const newRentalCar = {
      owner: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        gender: payload.gender,
      },
      carBrand: payload.carBrand,
    };
    const mongoCluster = await mongoClient.connect();
    const response = await mongoCluster
      .db("Rental")
      .collection("RentalCars")
      .insertOne(newRentalCar);
    mongoCluster.close();

    res.status(201).send(response);
  } catch (error) {
    res.status(500).end();
  }
});

server.get("/rental-cars/:carBrand", (req, res) => {
  const rentalCarsByCarBrand = rentalCars.filter((rentalCar) => {
    return (
      rentalCar.carBrand.toLowerCase() === req.params.carBrand.toLowerCase()
    );
  });
  res.send(rentalCarsByCarBrand);
});

server.get("/car-brands", (_, res) => {
  const carBrands = rentalCars.map((rentalCar) => {
    return rentalCar.carBrand;
  });
  const uniqueCarBrands = [...new Set(carBrands)];

  res.send(uniqueCarBrands);
});

server.listen(8080, () => console.log("server is running at 8080"));
