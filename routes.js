'use strict';

const express = require('express');

const Question = require('./models').Question;

const router = express.Router();


//get /questions
router.get('/', (req, res) => {
    //call the find method to question model
    Question.find({}, null, {sort: {createdAt: -1}}, function(err, questions){
        if(err) return next(err);
        res.json(questions);
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
router.get('/:qId', (req, res) => {
    res.json({
        response: `You sent me a GET request for an ID ${req.params.qId}`,
    });
});

module.exports = router;