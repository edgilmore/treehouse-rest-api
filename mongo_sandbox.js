'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sandbox');

const db = mongoose.connection;

db.on('error', function(err) {
    console.error('connection error:', err);
});

db.once('open', function(){
    console.debug('connection successful');
    // all database communication goes here
    const Schema = mongoose.Schema;
    const AnimalScheme = new Schema({
        type: { type: String, default: 'goldfish'},
        color: { type: String, default: 'gold'},
        size: { type: String, default: 'small'},
        mass: { type: Number, default: '0.007'},
        name: { type: String,  default: 'goldie'}
    });
    // create model for the animal scheme in mongo
    const Animal = mongoose.model('Animal', AnimalScheme);
    // create animal document
    const elephant = new Animal({
        type: 'elephant',
        color: 'gray',
        size: 'big',
        mass: 6000,
        name: 'Larry',
    });
    // save the object
    elephant.save(function(err){
        if(err) console.error('save failed');
        else console.debug('Saved!');
        // close db
        db.close(function(){
            console.debug('connection closed');
        });
    });
    
});
