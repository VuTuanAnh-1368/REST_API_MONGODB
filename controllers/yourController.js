const YourModel = require("../model/model.js");

const createData = async (req, res) => {
  try {
    const yourData = new YourModel(req.body);
    const savedData = await yourData.save();
    res.status(200).json(yourData);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Error saving data" });
  }
};

const getAllData = async (req, res) => {
  try {
    const data = await YourModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

const getDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await YourModel.findById(id);
    if (!data) {
      res.status(404).json({ message: "Data not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

const updateDataById = async (req, res) => {
  // Implement the logic for updating data here
};

const deleteDataById = async (req, res) => {
  // Implement the logic for deleting data here
};

module.exports = {
  createData,
  getAllData,
  getDataById,
  updateDataById,
  deleteDataById,
};