const {model} = require('../config/config.database');

const Scenery = model('Scenery', require('./schemas/scenery.schema'));
const Node = model('Node', require('./schemas/node.schema'));
const Marker = model('Marker', require('./schemas/marker.schema'));

module.exports = {
    Scenery,
    Node,
    Marker
}
