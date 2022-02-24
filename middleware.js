const { campgroundSchema, reviewSchema } = require('./schemas.js'); 
const ExpressError = require('./utils/ExpressError'); 
const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {  //opposite isUnAuthenticated()
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
        // res.redirect('/login'); // this also works for me
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next(); 
    }
}

//middleware to check authorisation
module.exports.isAuthor = async(req,res,next) => {
    const { id } = req.params;
      //find and check if the author matches currentUser
      const campground = await Campground.findById(id);
      if (!campground.author.equals(req.user._id)) {
          req.flash('error', ' You do not have permission to do that!');
          return res.redirect(`/campgrounds/${id}`);
      }
      next();
}
//for review
module.exports.isReviewAuthor = async(req,res,next) => {
    const {id, reviewId } = req.params;
      //find and check if the author matches currentUser
      const review = await Review.findById(reviewId);
      if (!review.author.equals(req.user._id)) {
          req.flash('error', ' You do not have permission to do that!');
          return res.redirect(`/campgrounds/${id}`);
      }
      next();
}

//set up validateReview middleware
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next(); 
    }
}