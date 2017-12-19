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
        next();
    });
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
router.post('/:qId/answers', (req, res) => {
    res.json({
        response: "You sent me a POST request /answers",
        questionId: req.params.qId,
        body: req.body
    });
});
//put /questions/:id/answers/:id
//edit a specific answer
router.put('/:qId/answers/:aId', (req, res) => {
    res.json({
        response: 'You sent me a PUT request to /answers',
        questionId: req.params.qId,
        answerId: req.params.aId,
        body: req.body
    })
});
//delete /questions/:qId/answers/:aId
//delete a specific answer
router.delete('/:qId/answers/:aId', (req, res) => {
    res.json({
        response: 'You sent me a DELETE request to /answers',
        questionId: req.params.qId,
        answerId: req.params.aId
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
            next();
        }
    },
    (req, res) => {
        res.json({
            response: `You sent me a POST request to /vote-${req.params.dir}`,
            questionId: req.params.qId,
            answerId: req.params.aId,
            vote: req.params.dir
        });
    });
// get /questions/:qId
router.get('/:qId', (req, res, next) => {
   res.json(req.question);
});

module.exports = router;