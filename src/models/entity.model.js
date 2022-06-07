const {model} = require('../config/config.database');

const Marker = model('Marker', require('./schemas/marker.schema'));

module.exports = {
    Marker
}
