//ye app,js k he pat h express router methos s for ease read k liye..


const express=require('express');
const router=express.Router({mergeParams:true}); //:id nhi ate h rote method s dusre file m so then we use this..
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../MODELS/review.js");
const Listing=require('../MODELS/listing.js');
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");

const reviewController=require("../controllers/reviews.js");

//reviews k post route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
//Delete review route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview));

module.exports=router;