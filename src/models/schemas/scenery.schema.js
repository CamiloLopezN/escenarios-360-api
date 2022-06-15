const {Schema} = require('mongoose');
const nodeSchema = require('./node.schema');

const scenerySchema = new Schema({
    sceneryId: {type: String, required: true, unique: true},
    nodes: [nodeSchema]
});

scenerySchema.plugin(require('mongoose-paginate-v2'));
scenerySchema.plugin(require('mongoose-aggregate-paginate-v2'));

module.exports = scenerySchema;
