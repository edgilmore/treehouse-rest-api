'use strict';

const express = require('express');
const app = express();
const routes = require('./routes');
const logger = require('morgan');
const mongoose = require('mongoose');

const jsonParser = require('body-parser').json;

const port = process.env.PORT || 3000;


app.use(logger('dev'));
app.use(jsonParser());

mongoose.connect('mongodb://localhost:27017/qa');

const db = mongoose.connection;

db.on('error', function(err){
    console.error('connection error: ', err);
});

db.on('open', function(){
    console.debug('db connection successful');
});
// custom middleware that allows for access from all domains
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requsted-With, Content-Type, Accept');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE');
        return res.status(200).json({});
    }
    next();
});
app.use('/questions', routes);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});
app.use((req, res, next) => {
    req.myMessage = `Hello, middlware #2`;
    next();
});
app.use((req, res, next) => {
    console.log(`The leaves on the trees are ${req.query.color}`);
    next();
});
app.use((req, res, next) => {
    console.log(req.myMessage);
    next();
});

app.listen(port, () => {
    console.log(`Express server is listening on port: ${port}`);
});