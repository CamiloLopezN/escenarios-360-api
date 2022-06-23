const express = require('express');
const router = express.Router();

const nodeController = require('../controllers/node.controller');

router.get('/', nodeController.getNodes);
router.get('/:nodeId', nodeController.getNodeById);
router.post('/', nodeController.postNode);
router.post('/markerAssociate', nodeController.markerAssociate);
router.delete('/deleteMarker/:nodeId/:id', nodeController.deleteMarkerById);

module.exports = router;
