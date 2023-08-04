'use strict';
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//get users
router.get('/', async (req, res) => {
  const user = await User.find().select('-passwordHash');

  if (!user) {
    res.status(400).send({
      message: 'There was an error when trying to get the response.',
    });
  }

  res.status(200).send({
    message: 'the response was successful.',
    user,
  });
});
//get a user excluding password
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');

    res.status(200).json({
      message: 'the response was successful.',
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong when getting the object',
      error: err.message,
    });
  }
});

//login user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //const secret = process.env.SECRET;
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        process.env.SECRET,{
          expiresIn : '1w'
        }
      );

      res.status(200).json({
        message: 'User autheticated successfully',
        user: user.email,
        token: token,
      });

    } else {
      res.status(401).json({
        message: 'Authentication failed. Invalid email or password.',
      });

    }
  } catch (err) {
    res.status(400).send({
      message: 'Something went wrong when authenticating the user.',
      err,
    });
  }
});
//post an user
router.post('/', async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      passwordHash: bcrypt.hashSync(req.body.password, 20),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      image: req.body.image,
    });

    user = await user.save();

    res.status(201).json({
      message: 'the response was successful.',
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong when creating the object',
      error: err.message,
    });
  }
});
module.exports = router;
