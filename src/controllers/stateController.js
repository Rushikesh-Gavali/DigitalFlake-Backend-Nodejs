const asyncHandler = require('express-async-handler');
const State = require('../models/State');

const addState = asyncHandler(async (req, res) => {
  const { stateName, stateCode } = req.body;

  const state = await State.create({ stateName, stateCode });

  if (state) {
    res.formatResponse(201, 'State created successfully', state);
  } else {
    res.formatResponse(400, 'Invalid state data');
  }
});

const updateState = asyncHandler(async (req, res) => {
  const state = await State.findById(req.params.id);

  if (state) {
    state.stateName = req.body.stateName || state.stateName;
    state.stateCode = req.body.stateCode || state.stateCode;
    state.status = req.body.status || state.status;

    const updatedState = await state.save();
    res.formatResponse(200, 'State updated successfully', updatedState);
  } else {
    res.formatResponse(404, 'State not found');
  }
});

const deleteState = asyncHandler(async (req, res) => {
  console.log('delete state called this is controller');
  const state = await State.findById(req.params.id);

  if (state) {
    await State.deleteOne({ _id: state._id });
    res.formatResponse(200, 'State removed successfully');
  } else {
    res.formatResponse(404, 'State not found');
  }
});

const getStates = asyncHandler(async (req, res) => {
  const states = await State.find({});
  res.formatResponse(200, 'States retrieved successfully', states);
});

module.exports = { addState, updateState, deleteState, getStates };
