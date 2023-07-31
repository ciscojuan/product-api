'use strict'
const express = require('express');
const User = require('../models/user');
const router = express.Router()

router.get('/', async   (req, res) => {
    const user = await User.find();

    if(!user){
        res.status(400).send({
            message : 'There was an error when trying to get the response.'
        })
    }

    res.status(200).send({
        message : 'the response was successful.',
        user
    })
})
module.exports = router