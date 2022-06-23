const mongoose = require('../config/config.database');
const {Node, Marker} = require('../models/entity.model');
const {authorize} = require("../middlewares/oauth/authentication");
const {STATUS_200, STATUS_400, STATUS_500, STATUS_404} = require("../utils/constants");

const postNode = async (req, res) => {
    const {nodeId, panoData, panorama, position, thumbnail, name, links} = req.body;
    const node = new Node({
        nodeId, panoData, panorama, position, thumbnail, name, links
    });
    try {
        const foundNode = await Node.findOne({nodeId});
        if (!foundNode) {
            await node.save();
        }
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError)
            return res.status(400).json({message: STATUS_400, errors: err.errors});
        return res.status(500).json({message: STATUS_500});
    }
    return res.status(200).json({message: STATUS_200});
}
module.exports.postNode = [authorize(), postNode];

const getNodes = async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const projection = {createdAt: 0, updatedAt: 0, __v: 0};
    let nodes;
    try {
        nodes = await Node.paginate({}, {projection, limit, page});
        if (!nodes) return res.status(404).json({message: STATUS_404});
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError)
            return res.status(400).json({message: STATUS_400});
        return res.status(500).json({message: STATUS_500});
    }
    return res.status(200).json({message: nodes});

}
module.exports.getNodes = [authorize(), getNodes];

const getNodeById = async (req, res) => {
    const {nodeId} = req.params;
    try {
        const doc = await Node.findOne({nodeId: nodeId})
        if (!doc) return res.status(404).json({message: STATUS_404});
        return res.status(200).json({message: doc});
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError)
            return res.status(400).json({message: STATUS_400});
        return res.status(500).json({message: STATUS_500});
    }
}
module.exports.getNodeById = [authorize(), getNodeById];

const deleteNodeById = async (req, res) => {
    const {nodeId} = req.params;
    try {
        const doc = await Node.findOne({markerId: nodeId})
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError)
            return res.status(400).json({message: STATUS_400});
        return res.status(500).json({message: STATUS_500});
    }
}
module.exports.deleteNodeById = [authorize(), deleteNodeById];


const markerAssociate = async (req, res) => {
    const {
        nodeId, id, longitude, latitude, image, width, height, anchor,
        tooltip, content, data
    } = req.body;
    const queryFindMarker = {'markers.id': id, nodeId: nodeId};
    try {
        const marker = new Marker({
            id, longitude, latitude, image, width,
            height, anchor, tooltip, content, data
        });
        const markerAssociate = await Node.findOne(queryFindMarker);
        const foundMarker = await Marker.findOne({id});
        if (!markerAssociate && !foundMarker) {
            await Node.updateOne({nodeId: nodeId}, {$push: {markers: marker}}).orFail();
            await marker.save();
        } else {
            await Marker.updateOne({id: id}, ({
                id, longitude, latitude, image, width,
                height, anchor, tooltip, content, data
            })).orFail();
            Node.updateOne({'markers.id': id},
                {
                    $set:
                        {
                            'markers.$.longitude': longitude, 'markers.$.latitude': latitude,
                            'markers.$.image': image, 'markers.$.width': width,
                            'markers.$.height': height, 'markers.$.anchor': anchor,
                            'markers.$.tooltip': tooltip, 'markers.$.content': content,
                            'markers.$.data': data
                        }
                }
            ).catch((err) => {
                    return res.status(500).json({message: STATUS_500 + err});
                }
            );
        }
    } catch (err) {
        if (err instanceof mongoose.Error.DocumentNotFoundError)
            return res.status(404).json({message: STATUS_404});
        if (err instanceof mongoose.Error.ValidationError)
            return res.status(400).json({message: STATUS_400, errors: e.errors});
        return res.status(500).json({message: STATUS_500 + err});
    }
    return res.status(200).json({message: STATUS_200});
}
module.exports.markerAssociate = [authorize(), markerAssociate];


const deleteMarkerById = async (req, res) => {
    const {nodeId, id} = req.params;
    const queryFindMarker = {'markers.id': id, nodeId: nodeId};
    try {
        await Node.updateOne(queryFindMarker, {"$pull": {"markers": {"id": id}}}, {
            safe: true,
            multi: true
        }).orFail();
        await Marker.deleteOne({id: id}).orFail();
        return res.status(200).json({message: STATUS_200});
    } catch (e) {
        if (e instanceof mongoose.Error.DocumentNotFoundError)
            return res.status(404).json({message: STATUS_404});
        if (e instanceof mongoose.Error.ValidationError)
            return res.status(400).json({message: STATUS_400, errors: e.errors});
        return res.status(500).json({message: STATUS_500 + e});
    }
}
module.exports.deleteMarkerById = [authorize(), deleteMarkerById];

