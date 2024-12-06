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
      const userData = await User.find(); // finds all users
      const shopData = await Shop.find();

      console.log('shop data', shopData);

      res.status(200).json({ message: 'User in categories', shopData});

    } catch (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

// show all the clothing which should be categorized based on pants, shirts and jackets

export default router;



