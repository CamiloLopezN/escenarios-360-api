const express = require('express');
const router = express.Router();

const markerController = require('../controllers/marker.controller');

router.get('/', markerController.getMarkers);
router.get('/:markerId', markerController.getMarkerById);
router.post('/', markerController.postMarker);


module.exports = router;
