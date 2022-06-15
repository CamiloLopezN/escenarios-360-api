const express = require('express');
const router = express.Router();

const markerController = require('../controllers/marker.controller');

router.get('/', markerController.getMarkers);
router.post('/', markerController.postMarker);
router.get('/:markerId', markerController.getMarkerById);


module.exports = router;
