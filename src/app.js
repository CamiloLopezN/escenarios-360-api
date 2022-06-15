const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/config.database');


app.use('/api', require('./routes'));
app.use('/api/marker', require('./routes/marker.routes'));
app.use('/api/node', require('./routes/node.routes'));

module.exports = app;
