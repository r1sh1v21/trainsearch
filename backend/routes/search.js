const express = require('express');
const router = express.Router();
const { findRoutes } = require('../utils/routefinder');

router.get('/', async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'from and to are required' });
  }

  if (from.toLowerCase() === to.toLowerCase()) {
    return res.status(400).json({ error: 'from and to cannot be the same station' });
  }

  try {
    const routes = await findRoutes(from, to);
    res.json({
      from,
      to,
      totalResults: routes.length,
      routes
    });
  } catch (err) {
    res.status(500).json({ error: 'something went wrong' });
  }
});

module.exports = router;