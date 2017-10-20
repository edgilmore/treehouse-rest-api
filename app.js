'use strict';

const express = require('express');
const app = express();
const routes = require('./routes');
const logger = require('morgan');

const jsonParser = require('body-parser').json;

const port = process.env.PORT || 3000;


app.use(logger('dev'));
app.use(jsonParser());

app.use('/questions', routes);

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