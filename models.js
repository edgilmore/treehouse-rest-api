'use strict';

const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const sortAnswers = function(a, b){
    // negative if a should appear before b
    // zero to leave unchanged
    // positive is a should appear after b
    if(a.votes === b.votes)
    {
        return a.updatedAt - b.updatedAt;
    }
    return b.votes - a.votes;
};

const AnswerSchema = new Scheme({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    votes: {
        type: Number,
        default: 0
    }
});

AnswerSchema.method('update', function(updates, callback) {
    Object.assign(this, updates, {updatedAt: new Date()});
    this.parent().save(callback);
});

AnswerSchema.method('vote', function(votes, callback){
    if(vote === 'up') {
        this.votes += 1;
    }
    else {
        this.votes -= 1;
    }
    this.parent().save(callback);
});

const QuestionSchema = new Scheme({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    answers: [AnswerSchema]
});

QuestionSchema.pre('save', function(next){
    this.answers.sort(sortAnswers);
    next();
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports.Question = Question;