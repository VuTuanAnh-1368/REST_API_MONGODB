
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const routes = require("./routes/routes");
dotenv.config();
const fetch = require("node-fetch");

// Connect mongoDB
mongoose.set("strictQuery", false);
mongoose.connect((process.env.MONGODB_URL),() => {
    console.log("Connecting to MongoDB");
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

//Routes
app.use("/api", routes);
// yourSchema 
const yourSchema = new mongoose.Schema({
  heartRate: Number,
  stepCount: Number,
  calories: Number,
  airQuality: Number
});

const YourModel = mongoose.model("YourModel", yourSchema);

// API endpoint -> Send data ESP8266 -> MONGODB
app.post("/api/fit", async (req, res) => {
  try {
    const data = req.body; // Data (ESP8266)

    const yourData = new YourModel(data);
    await yourData.save();

    console.log("Data saved:", data);
    res.status(200).json({ message: "Data saved successfully" });
    
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Error saving data" });
  }
});

//test get...
// app.get("/api", (req, res) => {
//   res.status(200).json({ message: "Server is running" });
// });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/fit", async (req, res) => {
  try {
    const data = await YourModel.find({}); //  'YourModel' 
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});