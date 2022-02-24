const Joi = require('joi');
const { model } = require('mongoose');


module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({ //campground is key and body must include it.
        title: Joi.string().required(), //type: string and required
        price: Joi.number().required().min(0),
        // image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required() //needs to be here 
});