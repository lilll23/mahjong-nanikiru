'use strict';
const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');
const Quiz = require('../models/quiz');
const User = require('../models/user');
const Clicks = require('../models/clicks');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

router.get('/new', authenticationEnsurer, csrfProtection, (req, res, next) => {
    res.render('new', { user: req.user, csrfToken: req.csrfToken(), create: true });
});

router.get('/:quizId(\\d+)', function(req, res, next) {
  Quiz.findOne({
    include: [
      {
        model: User,
        attributes: ['userId', 'username']
      }],
    where: {
      quizId: req.params.quizId
    },
    order: [['updatedAt', 'DESC']]
  }).then((quiz) => {
    if (quiz) {
      res.render('quiz', {
        user: req.user,
        quiz: quiz
        });
    } else {
      const err = new Error('問題が存在しません');
      err.status = 404;
      next(err);
    }
  });
});

router.post('/', authenticationEnsurer, csrfProtection, (req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  const updatedAt = new Date();
  Quiz.create({
    prevalentWind: req.body.prevalentWind,
    handNum: req.body.handNum,
    turnNum: req.body.turnNum,
    seatWind: req.body.seatWind,
    quizContent: req.body.Tiles,
    comment: req.body.comment,
    createdBy: req.user.id,
    updatedAt: updatedAt
  }).then((quiz) => {
    res.redirect('/quiz/' + quiz.quizId);
  });
});

router.get('/:quizId(\\d+)/vote/:tileId', (req, res, next) => {
  Clicks.findOrCreate({
    where: {
      quizId: req.params.quizId,
      tileId: req.params.tileId
    }
  }).then((clicks) =>{
    clicks[0].increment('clicks', { by: 1 });
  }).then((clicks) => {
    res.redirect('/quiz/' + req.params.quizId + '/result');
  });
});

router.get('/:quizId(\\d+)/result', (req, res, next) => {
  Clicks.findAll({
    where: {
      quizId: req.params.quizId
    },
    order: [['clicks', 'DESC']]
  }).then((clicks) => {
    res.render('result', {
      clicks: clicks
      });
  });
});

module.exports = router;