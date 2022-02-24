const mongoose = require('mongoose');
//import the file cities
const cities = require('./cities');
//deconstruct and import from seedHelpers.js
const { places, descriptors } = require('./seedHelpers')
//require model
const Campground = require('../models/campground'); 

mongoose.connect('mongodb://localhost:27017/yelp-camp') 


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];//pass in an array and return 

//start
const seedDB = async () => {
    await Campground.deleteMany({}); 
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 9;
        //set location with 2 things: city and state
        const camp = new Campground({
            //YOUR USER ID .... 
            author: "620593b5bb896176c4ab7136",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Standing on the smooth sandy beach at the east end of the pond, in a calm September afternoon, when a slight haze makes the opposite shore-line indistinct, I have seen whence came the expression, the glassy surface of a lake.',
            price,
            geometry: { "type" : "Point", 
                        "coordinates" : [ 
                            cities[random1000].longitude,
                            cities[random1000].latitude,
                         ] 
                },
            images: [
                {
                  url: 'https://res.cloudinary.com/drtlyfm98/image/upload/v1645051887/yelpCamp/yhg0rdicekhs5otuf1ku.jpg',
                  filename: 'yelpCamp/yhg0rdicekhs5otuf1ku',
                
                },
                {
                  url: 'https://res.cloudinary.com/drtlyfm98/image/upload/v1645051890/yelpCamp/saanovpeywcf9ue2cqlf.jpg',
                  filename: 'yelpCamp/saanovpeywcf9ue2cqlf',
              
                }
              ]           
        })
        await camp.save();
    }
} 


seedDB().then(() => {
    mongoose.connection.close();
}) // seedDB will connect then close