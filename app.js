'use strict';

const express = require('express');
const app = express();
const routes = require('./routes');
const logger = require('morgan');
const db = require('./mongo_sandbox');

const jsonParser = require('body-parser').json;

const port = process.env.PORT || 3000;


app.use(logger('dev'));
app.use(jsonParser());

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