const express = require('express');
const router = express.Router();

const nodeController = require('../controllers/node.controller');

router.post('/', nodeController.postNode);
router.get('/:nodeId', nodeController.getNodeById);
router.post('/markerAssociate', nodeController.markerAssociate);

module.exports = router;
