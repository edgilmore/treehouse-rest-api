'use strict';

const express = require('express');
const router = express.Router();

//get /questions
router.get('/', function (req, res) {
    //return all the questions
    res.json({
        response: "You sent me a GET request"
    });
});
//post /questions/:id/answers
router.post('/:qId/answers', function (req, res) {
    res.json({
        response: "You sent me a POST request /answers",
        questionId: req.params.qId,
        body: req.body
    });
});
//put /questions/:id/answers/:id
//edit a specific answer
router.put('/:qId/answers/:aId', function (req, res) {
    res.json({
        response: 'You sent me a PUT request to /answers',
        questionId: req.params.qId,
        answerId: req.params.aId,
        body: req.body
    })
});
//delete /questions/:qId/answers/:aId
//delete a specific answer
router.delete('/:qId/answers/:aId', function (req, res) {
    res.json({
        response: 'You sent me a DELETE request to /answers',
        questionId: req.params.qId,
        answerId: req.params.aId
    });
});
//post /questions/:qId/answers/:aId/vote-up
//post /questions/:qId/answers/:aId/vote-down
//vote on an answer
router.post('/:qId/answers/:aId/vote-:dir', function (req, res) {
    res.json({
        response: `You sent me a POST request to /vote-${req.params.dir}`,
        questionId: req.params.qId,
        answerId: req.params.aId,
    });
});
// get /questions/:qId
router.get('/:qId', function (req, res) {
    res.json({
        response: `You sent me a GET request for an ID ${req.params.qId}`,
    });
});

module.exports = router;