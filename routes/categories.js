'use strict'
const express = require('express');
const Category = require('../models/category')
const router = express.Router();
//get all categories
router.get('/', async (req, res)=>{
    const category = await Category.find();

    if(!category){
        res.status(400).send({
            message : 'There was an error whe trying to get the request'
        })
    }

    res.status(200).send({
        message: 'the request was successull.',
        category
    })
})

//get a category
router.get('/:id', async (req,res) =>{

    const category = await Category.findById(req.params.id)

    if(!category){
        res.status(404).json({message : 'The Category for the id given was not found'})
    }

    res.status(200).json({ message: 'The request was successfully', category});
})

//post categories
router.post('/', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//update a category
router.put('/:id', async (req,res) =>{
    const category = await Category.findByIdAndUpdate(
        req.params.id, {
            name : req.body.name,
            color : req.body.color,
            icon : req.body.icon
        }, {
            new : true
        });

        if(!category){
            res.status(404).json({messge : 'The category with the id given was not found'})
        }

        res.status(201).json({ message : 'The request was successful', category})
})

// delete categories
router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if(category){
            return res.status(200).json({message : 'catergory was deleted Successfully.'})
        }else{
            return res.status(404).json({message : 'Category not found.'})
        }
    }).catch(err => { 
        return res.status(400).json({message: 'There was an error in the request.', err})
    })
})


module.exports = router