const express = require('express');
const router = express.Router({ mergeParams: true }); 
const {validateReview , isLoggedIn, isReviewAuthor} = require('../middleware');

const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');

const { reviewSchema } = require('../schemas.js'); // joi schema
//use ExpressError to handle error
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

//for reviews --- add middleWare validateReview
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

//delete reviews //remove that reference and remove the review itself
router.delete('/:reviewId',isLoggedIn ,isReviewAuthor ,catchAsync(reviews.deleteReview))

module.exports = router;