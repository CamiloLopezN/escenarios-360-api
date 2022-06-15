const {Schema} = require('mongoose');

const markerSchema = new Schema({
    markerId: {type: String, required: true, unique: true},
    longitude: {type: String, required: true},
    latitude: {type: String, required: true},
    image: {type: String, required: true},
    width: {type: String, required: true},
    height: {type: String, required: true},
    anchor: {type: String, required: true},
    tooltip: {type: String, required: true},
    content: {type: String, required: true},
    data: {type: String, required: true}
});

markerSchema.plugin(require('mongoose-paginate-v2'));
markerSchema.plugin(require('mongoose-aggregate-paginate-v2'));

module.exports = markerSchema;
