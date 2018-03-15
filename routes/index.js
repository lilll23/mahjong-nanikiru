'use strict';
const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
const User = require('../models/user');
const moment = require('moment-timezone');

router.get('/', function(req, res, next) {
  if (req.user) {
    Quiz.findAll({
      where: {
        createdBy: req.user.id
      },
      order: [['updatedAt', 'DESC']]
    }).then((quizzes) => {
      quizzes.forEach((quiz) => {
        quiz.formattedUpdatedAt = moment(quiz.updatedAt).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm');
      });
      res.render('index', {
        user: req.user,
        quizzes: quizzes
      });
    });
  } else {
    res.render('index', { user: req.user });
  }
});

router.get('/list', function(req, res, next) {
  Quiz.findAll({
    include: [
      {
        model: User,
        attributes: ['userId', 'username']
      }],
    order: [['updatedAt', 'DESC']]
  }).then((quizzes) => {
    quizzes.forEach((quiz) => {
      quiz.formattedUpdatedAt = moment(quiz.updatedAt).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm');
    });
    res.render('list', {
      user: req.user,
      quizzes: quizzes
    });
  });
});

module.exports = router;