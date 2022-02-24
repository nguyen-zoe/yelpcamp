const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

//set up virtual property //each image --- move images schema
// https://res.cloudinary.com/demo/image/upload/w_300/sample.jpg

const ImageSchema = new Schema({
    
        url: String,
        filename: String
    
});
//to seperate schema to use virtual
ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200,h_150'); //or 'upload/w_200'
});

//making schema
const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema], //after move images into its schema
    //copy from https://mongoosejs.com/docs/geojson.html and change location to geometry
    geometry: {
        type: {
          type: String, //must be String
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

//query middleWare... access in doc
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if(doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

//export the schema
module.exports = mongoose.model('Campground', CampgroundSchema); //name: Campground, schema: CampgroundSchema
