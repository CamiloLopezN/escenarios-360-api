const {Schema} = require('mongoose');
const markerSchema = require('./marker.schema');

const nodeSchema = new Schema({
    nodeId: {type: String, required: true, unique: true},
    markers: [markerSchema],
    panoData: {type: String, required: true},
    panorama: {type: String, required: true},
    position: {type: String, required: true},
    thumbnail: {type: String, required: true},
    name: {type: String, required: true},
    links: {type: String, required: true}
});

nodeSchema.plugin(require('mongoose-paginate-v2'));
nodeSchema.plugin(require('mongoose-aggregate-paginate-v2'));

module.exports = nodeSchema;
