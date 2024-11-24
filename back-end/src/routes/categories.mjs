import 'dotenv/config.js'
import express from 'express';
import sanitize from 'mongo-sanitize';
import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';
import { User, Shop } from "../models/db.mjs"
import * as auth from '../auth.mjs'
const router = express.Router();


// Route to get user categories
router.get('/:username/categories', async (req, res) => {
    const { username } = req.params;  // Get the username from the URL parameter
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User in categories', user });
    //   const categories = await Categories.find({ userId: user._id });  // Fetch categories based on the user
    //   res.json(categories);  // Send categories data
    } catch (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  


export default router;



