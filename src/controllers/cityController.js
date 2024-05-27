const asyncHandler = require('express-async-handler');
const City = require('../models/City');

const createCity = asyncHandler(async (req, res) => {
  const { cityName, cityCode, stateName } = req.body;

  const city = new City({ cityName, cityCode, stateName });
  await city.save();
  
  res.formatResponse(201, 'City created successfully', city);
});

const getCities = asyncHandler(async (req, res) => {
  const cities = await City.find();
  res.formatResponse(200, 'Cities retrieved successfully', cities);
});

const updateCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { cityName, cityCode, stateName, status } = req.body;

  const city = await City.findById(id);

  if (city) {
    city.cityName = cityName || city.cityName;
    city.cityCode = cityCode || city.cityCode;
    city.stateName = stateName || city.stateName;
    city.status = status || city.status;

    const updatedCity = await city.save();
    res.formatResponse(200, 'City updated successfully', updatedCity);
  } else {
    res.formatResponse(404, 'City not found');
  }
});

const deleteCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const city = await City.findById(id);

  if (city) {
    await City.deleteOne({ _id: city._id });
    res.formatResponse(200, 'City removed successfully');
  } else {
    res.formatResponse(404, 'City not found');
  }
});


module.exports = {
  createCity,
  getCities,
  updateCity,
  deleteCity,
};
