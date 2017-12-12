'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sandbox');

const db = mongoose.connection;

db.on('error', function (err) {
    console.error('connection error:', err);
});

db.once('open', function () {
    console.debug('connection successful');
    // all database communication goes here
    const Schema = mongoose.Schema;
    const AnimalScheme = new Schema({
        type: {
            type: String,
            default: 'goldfish'
        },
        color: {
            type: String,
            default: 'gold'
        },
        size: String,
        mass: {
            type: Number,
            default: '0.007'
        },
        name: {
            type: String,
            default: 'goldie'
        }
    });
    AnimalScheme.pre('save', function(next){
        if(this.mass >= 100) {
            this.size = 'big';
        } else if (this.mass >= 5 && this.mass < 100) {
            this.size = 'medium';
        } else {
            this.size = 'small';
        }
        next();
    });
    AnimalScheme.statics.findSize = function(size,callback){
        //this === Animal
        return this.find({size: size}, callback);
    };
    AnimalScheme.methods.findSameColor = function(callback) {
        //this === document
        return this.model('Animal').find({color: this.color}, callback);
    };
    // create model for the animal scheme in mongo
    const Animal = mongoose.model('Animal', AnimalScheme);
    const animal = new Animal({});
    // create animal document
    const elephant = new Animal({
        type: 'elephant',
        color: 'gray',
        mass: 6000,
        name: 'Larry',
    });
    const whale = new Animal({
        type: 'whale',
        mass: 190500,
        name: 'Fig',
    });

    const animalData = [{
            type: 'mouse',
            color: 'gray',
            mass: 0.035,
            name: 'Marvin'
        },
        {
            type: 'nutria',
            color: 'brown',
            mass: 6.35,
            name: 'Gretchen'
        },
        {
            type: 'wolf',
            colors: 'gray',
            mass: 45,
            name: 'Iris',
        },
        elephant,
        whale,
        animal
    ];
    Animal.remove({}, function (err) {
        if (err) console.error(err);
        Animal.create(animalData, function (err, animals) {
            if (err) console.error(err);
            Animal.findOne({type: 'elephant'}, function (err, elephant) {
                elephant.findSameColor(function(err, animals){
                    if(err) console.error(err);
                    animals.forEach(function (animal) {
                        console.log(animal.name + ' the ' + animal.color + ' ' + animal.type);
                    });
                    closeDataStore(db);
                });
            });
        });
    });
});
// close db
function closeDataStore(db) {
    db.close(function () {
        console.debug('connection closed');
    });
}