//ye app,js k he pat h express router methos s for ease read k liye..





const express=require('express');
const router=express.Router();
const Listing=require('../MODELS/listing.js');
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");
const multer=require('multer');
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});



router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,validateListing, 
    upload.single('listing[image]'),     
    wrapAsync (listingController.createListing)

);


router
.route("/new")
.get(isLoggedIn,listingController.renderNewForm);




router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'), validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));



module.exports=router;