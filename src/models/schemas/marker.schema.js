const {Schema} = require('mongoose');

const tooltip = new Schema({
    content: {type: String, required: true},
    position: {type: String, required: true}
});

const data = new Schema({
    generated: {type: Boolean, required: true}
});

const markerSchema = new Schema({
        id: {type: String, required: true, unique: true},
        userId: {type: String, required: true, unique: true},
        longitude: {type: String, required: true},
        latitude: {type: String, required: true},
        image: {type: String, required: true},
        width: {type: String, required: true},
        height: {type: String, required: true},
        anchor: {type: String, required: true},
        tooltip: tooltip,
        content: {type: String, required: true},
        data: data
    }
);

markerSchema.plugin(require('mongoose-paginate-v2'));
markerSchema.plugin(require('mongoose-aggregate-paginate-v2'));

module.exports = markerSchema;
