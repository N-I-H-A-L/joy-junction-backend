import express from "express";
import mongoose from "mongoose";
import Image from "../models/Images.js";

const router = express.Router();

router.post('/upload', async (req, res)=>{
    const { imageUrl, password } = req.body;

    if(password!=process.env.PASSWORD){
        return res.status(401).json({ message: "Wrong Password" });
    }

    if (!imageUrl) {
        return res.status(400).send('Image URL is required');
    }

    try {
        const newImage = new Image({ imageUrl });
        await newImage.save();
        return res.status(200).json({ message: "Image URL added successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error adding image URL:", error });
    }
});

router.get('/getImages', async (req, res)=> {
    try{
        const images = await Image.find();
        res.status(200).json(images);
    }
    catch(error) {
        return res.status(500).json({message: "Error fetching images: ", error});
    }
});

router.delete('/deleteImg', async (req, res) => {
    const { id } = req.body;
  
    if (!id) {
      return res.status(400).json({ message: "Image ID is required." });
    }
  
    try {
      const image = await Image.findByIdAndDelete(id);
      if (!image) {
        return res.status(404).json({ message: "Image not found." });
      }
      return res.status(200).json({ message: "Image deleted successfully." });
    } catch (error) {
      return res.status(500).json({ message: "Error in deleting image.", error });
    }
});

export default router;