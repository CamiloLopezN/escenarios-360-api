const express = require('express');
const router = express.Router();

const markerController = require('../controllers/marker.controller');

/* GET users listing. */
router.get('/', markerController.getMarkers);
router.post('/', markerController.postMarker);

module.exports = router;
