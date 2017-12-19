'use strict';

const express = require('express');
const Question = require('./models').Question;
const router = express.Router();
router.param('qId', (req, res, next, id) => {
    Question.findById(id, (err, doc) => {
        if(err) return next(err);
        if(!doc) {
            err = new Error('Not Found');
            err.status = 404;
            return next(err);
        }
        req.question = doc;
        return next();
    });
});
router.param('aId', (req, res, next, id) => {
    req.answer = req.question.answers.id(id);
    if(!req.answer) {
        err = new Error('Not Found');
        err.status = 404;
    }
    return next();
});

//get /questions
router.get('/', (req, res, next) => {
    //call the find method to question model
    Question.find({}, null, {sort: {createdAt: -1}}, (err, questions) => {
        if(err) return next(err);
        res.json(questions);
    });
    // alternate
    // Question.find({})
    //             .sort({createdAt: -1})
    //             .exec(function(err, questions){
    //                 if(err) return next(err);
    //                 res.json(questions);
    //             });
});
// get /questions/:qId
router.get('/:qId', (req, res, next) => {
    res.json(req.question);
 });
// post /questions
// Route for creating questions
router.post('/', (req, res, next) => {
    const question = new Question(req.body);
    question.save(function(err, question){
        if(err) return next(err);
        res.status(201);
        res.json(question);
    });
});
//post /questions/:id/answers
router.post('/:qId/answers', (req, res, next) => {
    req.question.answers.push(res.body);
    req.question.save((err, quesiton) => {
        if(err) return next(err);
        res.status = 201;
        res.json(quesiton);
    });
});
//put /questions/:id/answers/:id
//edit a specific answer
router.put('/:qId/answers/:aId', (req, res, next) => {
    req.answer.update(req.body, (err, result) => {
        if(err) return next(err);
        res.json(result)
    });
});
//delete /questions/:qId/answers/:aId
//delete a specific answer
router.delete('/:qId/answers/:aId', (req, res, next) => {
    req.question.answer.remove((err) => {
        req.question.save((err, question) => {
            if(err) return next(err);
            res.json(question);
        });
    });
});
//post /questions/:qId/answers/:aId/vote-up
//post /questions/:qId/answers/:aId/vote-down
//vote on an answer
router.post('/:qId/answers/:aId/vote-:dir', (req, res, next) => {
        if (req.params.dir.search(/^(up|down)$/) === -1) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        } else {
            req.vote = req.params.dir;
            next();
        }
    },
    (req, res) => {
        req.answer.vote(req.vot, (err, question) => {
            if(err) return next(err);
            res.json(question);
        });
    });

module.exports = router;