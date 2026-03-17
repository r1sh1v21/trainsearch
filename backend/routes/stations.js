const express = require('express');
const router = express.Router();
const Station = require('../models/station');

router.get('/', async (req, res) => {
  try {
    const stations = await Station.find({}).sort({ name: 1 });
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: 'something went wrong' });
  }
});

module.exports = router;