'use strict'
const express = require('express');
const { Product } = require('../models/products');
const Category = require('../models/category');
const router = express.Router();

router.get('/', async (req, res) => {
    const product = await Product.find().populate('category');

    if (!product) {
        res.status(500).send({
            message: 'There was an error when trying get the request',
            error: error
        })
    }

    res.status(200).send({
        message: 'request was successfull',
        product
    })
})
//get names's products
router.get('/names', async (req,res) =>{
    const product = await Product.find().select('name image -_id');//show name, image, exluding _id

    if(!product){
        res.status.json({message: 'The product with id given does not exists.'})
    }

    res.status(200).json(product)
})

//get a product
router.get('/:id', async (req,res) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
        res.status.json({message: 'The product with id given does not exists.'})
    }

    res.status(200).json(product)
})

// post a product
router.post(`/`, async (req, res) => {

    //first of all,validate if there is a category
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(404).json('invalid category')
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        ifFeature: req.body.ifFeature

    })

    product = await product.save();

    if (!product) {
        res.status(404).json({
            message: 'Something happened when creating the object'
        })
    }

    res.status(201).json({
        message: 'The request was Successfully.',
        product
    })

})


module.exports = router