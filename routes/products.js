"use strict";
const express = require("express");
const { Product } = require("../models/products");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const product = await Product.find().populate("category");

  if (!product) {
    res.status(500).send({
      message: "There was an error when trying get the request",
    });
  }

  res.status(200).send({
    message: "request was successfull",
    product,
  });
});
//get names's products
router.get("/names", async (req, res) => {
  const product = await Product.find().select("name image -_id"); //show name, image, exluding _id

  if (!product) {
    res.status.json({ message: "The product with id given does not exists." });
  }

  res.status(200).json(product);
});

//get a product
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status.json({ message: "The product with id given does not exists." });
  }

  res.status(200).json(product);
});

//get products by category
router.get(`/category/:id`, async (req, res) => {
    const product = await Product.find({ category: req.params.id });
  
    if (!product) {
      res.status(404).json({
        message: "Something happened when deleting the object",
      });
    }
  
    res.status(201).json({
      message: "The request was Successfully.",
      product,
    });
  });

//get the procduts count
router.get('/get/count', async (req, res) =>{
    const productCount =  await Product.estimatedDocumentCount();

    if (!productCount) {
        res.status(500).json({message: "Something happened when deleting the object"});
    }
    res.status(200).json({
        productCount : productCount
    })
})

//get products which is featured
router.get('/get/featured/:count', async (req, res) =>{
    const count = req.params.count ? req.params.count : 0;
    const product = await Product.find({ifFeature: true}).limit(+count);
    if (!product) {
        res.status(500).json({message: "Something happened when deleting the object"});
    }
    res.status(200).json(
        { product : product}
    )
})

// post a product
router.post(`/`, async (req, res) => {
  //validate if category id exists
  if (!mongoose.isValidObjectId(req.body.category)) {
    res.status(400).send({
      message: "The category id given does not exists.",
    });
  }

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
    ifFeature: req.body.ifFeature,
  });

  try {
    product = await product.save();
  } catch (error) {
    // Handle the error and send an appropriate response
    return res.status(500).json({
      message: "Something went wrong when creating the object",
      error: error.message,
    });
  }

  res.status(201).json({
    message: "The request was Successfully.",
    product,
  });
});

//update product
router.put(`/:id`, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res
      .status(404)
      .json({ message: "The product with id given does not exists." });
  }

  //validate if category id exists
  if (!mongoose.isValidObjectId(req.body.category)) {
    res.status(400).send({
      message: "The category id given does not exists.",
    });
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
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
      ifFeature: req.body.ifFeature,
    },
    { new: true }
  );

  if (!product) {
    res.status(404).json({
      message: "Something happened when updating the object",
    });
  }

  res.status(201).json({
    message: "The request was Successfully.",
    product,
  });
});

//delete product
router.delete(`/:id`, async (req, res) => {
  let isValid = mongoose.isValidObjectId(req.params.id);
  if (!isValid) {
    res.status(404).json({
      message: "The product with id given does not exists.",
    });
  }
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) {
    res.status(404).json({
      message: "Something happened when deleting the object",
    });
  }

  res.status(201).json({
    message: "The request was Successfully, The object was deleted",
  });
});

module.exports = router;
