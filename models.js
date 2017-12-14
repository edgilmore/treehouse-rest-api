'use strict';

const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

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

const QuestionSchema = new Scheme({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    answers: [AnswerSchema]
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports.Question = Question;