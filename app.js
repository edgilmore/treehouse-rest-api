'use strict';

const express = require('express');
const app = express();
const jsonParser = require('body-parser').json;

const port = process.env.PORT || 3000;

const jsonCheck = (req, res, next) => {
    if(req.body){
        console.log(`The sky is ${req.body.color}`);
        return res;
    }
    else {
        console.log(`there is no body property on the request`);
        return res;
    }
};
app.use(jsonCheck);
app.use(jsonParser());
app.use(jsonCheck);

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