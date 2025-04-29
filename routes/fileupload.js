const express=require('express');
const router=express.Router();
const {localfileupload,imageupload,videoUpload,imagesizereducer}=require('../controllers/FileUpload');
router.post("/localfileupload",localfileupload);
router.post("/imageupload",imageupload);
router.post("/videoUpload",videoUpload);
router.post("/imagesizereducer",imagesizereducer);
module.exports=router;