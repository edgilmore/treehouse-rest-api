'use strict';

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log('First piece of middleware');
    next();
});
app.use((req, res, next) => {
    console.log('Second piece of middleware');
    next();
});

app.listen(port, () => {
    console.log(`Express server is listening on port: ${port}`);
});