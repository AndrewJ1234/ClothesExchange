import 'dotenv/config.js';
import express from 'express';
import sanitize from 'mongo-sanitize';
import mongoose from 'mongoose';
import { User, Shop } from "../models/db.mjs";

const router = express.Router();

// Route to get user shop items
router.get('/:username/myshop', async (req, res) => {
  const { username } = req.params; // Get the username from the URL parameter

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch the shop based on the user
    const shop = await Shop.findOne({ userId: user._id });

    if (!shop || shop.items.length === 0) {
      return res.status(404).json({ message: 'No products found', shop: [] });
    }

    res.status(200).json({ message: 'User shop found', shop: shop.items });
  } catch (err) {
    console.error('Error fetching shop items:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to add a product to the user's shop
router.post('/:username/myshop/add', async (req, res) => {
    const { username } = req.params;
    const { title, price, image, tag } = req.body;
  
    console.log('body', req.body);
  
    try {
      const existingUser = await User.findOne({ username }).populate('shops').exec();
  
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log('existingUser:', existingUser);
  
      let shop = existingUser.shops && existingUser.shops[0]; 

      if (!shop) {
        const baseSlug = `${username}-shop`;
        // console.log('my shop add', baseSlug);
        // const uniqueSlug = await generateUniqueSlug(baseSlug);
        shop = new Shop({
          userId: existingUser._id,
          slug: baseSlug,
          items: [], 
        });
        await shop.save();
  
        existingUser.shops.push(shop._id);
        await existingUser.save();
      }
  
      const newItem = { name: title, price: price, image: image, tag: tag };
      console.log(newItem);
      shop.items.push(newItem);
      await shop.save();
      console.log(shop);
      console.log('shop after adding item:', shop.items);
  
      res.status(201).json({ message: 'Product added successfully', product: newItem });
    } catch (err) {
      console.error('Error adding product:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  

export default router;
