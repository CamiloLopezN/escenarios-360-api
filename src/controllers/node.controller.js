const mongoose = require('../config/config.database');
const {Node, Marker} = require('../models/entity.model');
const {authorize} = require("../middlewares/oauth/authentication");

const postNode = async (req, res) => {
    const {nodeId, panoData, panorama, position, thumbnail} = req.body;
    const node = new Node({
        nodeId, panoData, panorama, position, thumbnail
    });

    try {
        const foundNode = await Node.findOne({nodeId});
        if (!foundNode) {
            await node.save();
        }
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError)
            return res.status(400).json({message: 'Incomplete or bad formatted marked data', errors: err.errors});
        console.log(err)
        return res.status(500).json({message: 'Internal server error'});
    }
    return res.status(200).json({message: 'Successful operation'});
}
module.exports.postNode = [authorize(), postNode];

const getNodes = async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const projection = {createdAt: 0, updatedAt: 0, __v: 0};
    let nodes;
    try {
        nodes = await Node.paginate({}, {projection, limit, page});
        if (!nodes) return res.status(404).json({message: 'Recursos no encontrado.'});
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError)
            return res.status(400).json({message: 'Incomplete or bad formatted client data'});
        return res.status(500).json({message: 'Internal server error'});
    }
    return res.status(200).json({message: nodes});

}
module.exports.getNodes = [authorize(), getNodes];

const getNodeById = async (req, res) => {
    const {nodeId} = req.params;
    try {
        const doc = await Node.findOne({markerId: nodeId})
        if (!doc) return res.status(404).json({message: 'Resource not found'});
        return res.status(200).json({message: doc});
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError)
            return res.status(400).json({message: 'Incomplete or bad formatted client data'});
        return res.status(500).json({message: 'Internal server error'});
    }
}
module.exports.getNodeById = [authorize(), getNodeById];

const deleteNodeById = async (req, res) => {
    const {nodeId} = req.params;
    try {
        const doc = await Node.findOne({markerId: nodeId})

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError)
            return res.status(400).json({message: 'Incomplete or bad formatted client data'});
        return res.status(500).json({message: 'Internal server error'});
    }
}
module.exports.deleteNodeById = [authorize(), deleteNodeById];


const markerAssociate = async (req, res) => {
    const {
        nodeId, markerId, longitude, latitude, image, width, height, anchor,
        tooltip, content, data
    } = req.body;
    const queryFindMarker = {'markers.markerId': markerId, nodeId: nodeId};

    try {
        const markerAssociate = await Node.findOne(queryFindMarker);
        const foundMarker = await Marker.findOne({markerId});

        if (!markerAssociate && !foundMarker) {
            const marker = new Marker({
                markerId, longitude, latitude, image, width,
                height, anchor, tooltip, content, data
            });
            await Node.updateOne({nodeId: nodeId}, {$push: {markers: marker}}).orFail();
            await marker.save();
        } else {
            return res.status(304).json({message: 'La marca ya existe!'});
        }
    } catch (e) {
        if (e instanceof mongoose.Error.DocumentNotFoundError)
            return res.status(404).json({message: 'Not found resource'});
        if (e instanceof mongoose.Error.ValidationError)
            return res.status(400).json({message: 'Incomplete or bad formatted marked data', errors: e.errors});
        return res.status(500).json({message: 'Internal server error'});
    }
    return res.status(200).json({message: 'Successful operation'});
}

module.exports.markerAssociate = [authorize(), markerAssociate];
