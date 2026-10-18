


require("dotenv").config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../MODELS/listing.js");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  const listings = [];
  for (let obj of initData.data) {
    const response = await geocodingClient
      .forwardGeocode({
        query: `${obj.location}, ${obj.country}`,
        limit: 1,
      })
      .send();

    const feature = response.body.features[0];
    if (!feature) {
      console.log("Location nahi mili:", obj.location);
      continue;
    }

    listings.push({
      ...obj,
      owner: "6ac9d8e65bf3fbc898ed00fd",
      geometry: feature.geometry,
    });
  }

  await Listing.insertMany(listings);
  console.log("Data initialized, listings:", listings.length);
};

main()
  .then(() => console.log("MONGO CONNECT WITH EXPRESS"))
  .then(initDB)
  .then(() => mongoose.connection.close())
  .catch((err) => console.log(err));