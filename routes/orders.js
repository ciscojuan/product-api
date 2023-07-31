'use strict'
const express = require('express');
const Order = require('../models/category');
const router = express.Router();

router.get('/', async (req, ress) => {
    const order = await Order.find();

    if(!order){
        re.status(400).send({
            message : 'There was an error in the response'
        })
    }

    ress.status(200).send({
        message : 'The request was succesfull.',
        order
    })
})
module.exports = router