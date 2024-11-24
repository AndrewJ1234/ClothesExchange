import 'dotenv/config.js'
import express from 'express';
import sanitize from 'mongo-sanitize';
import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';
import { User, Shop } from "../models/db.mjs"
import * as auth from '../auth.mjs'
const router = express.Router();


// verify login information
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await auth.login(username, password);
      await auth.startAuthenticatedSession(req, user);
      const slug = generateSlug(username);
      res.status(200).json({
        message: 'Login successful',
        user: user,
        slug: slug
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message || 'Login unsuccessful' });
    }
  });
  
  

  const generateSlug = (username) => {
    return username.toLowerCase().replace(/\s+/g, '-'); 
  };


// create new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, clothesToTrade, profession } = req.body;
        // console.log('Registration data:', req.body);

        const slug = generateSlug(username);
        console.log('register post method', clothesToTrade)
        const newUser = await auth.register(
          sanitize(username), 
          sanitize(email), 
          password,
          sanitize(clothesToTrade),
          sanitize(profession),
          slug
        );

        await auth.startAuthenticatedSession(req, newUser);
        res.status(200).json({ message: 'Registration successful', slug: slug });
        // res.send();
    } catch (err) {
        console.log('Registration error:', err);
        res.status(400).json({ message: err.message || 'Registration error' });
    }
});


// Get user data by username
// router.get('/:slug', async (req, res) => {
//     try {
//         const username = sanitize(req.params.username);
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(user);
//     } catch (err) {
//         console.error('Error fetching user:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// Update user data by username
router.put('/:slug', async (req, res) => {
    try {
        const username = sanitize(req.params.username);
        const updates = sanitize(req.body);

        const user = await User.findOneAndUpdate({ username }, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Route to get user categories
// router.get('/categories/:slug', async (req, res) => {
//     const { username } = req.params;  // Get the username from the URL parameter
//     try {
//       const user = await User.findOne({ username });
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.status(200).json({ message: 'User in categories', user });
//     //   const categories = await Categories.find({ userId: user._id });  // Fetch categories based on the user
//     //   res.json(categories);  // Send categories data
//     } catch (err) {
//       console.error('Error fetching categories:', err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
//   // Route to get user shop items
//   router.get('/myshop/:slug', async (req, res) => {
//     const { username } = req.params;  // Get the username from the URL parameter
//     try {
//       const user = await User.findOne({ username });
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       const shopItems = await Shop.find({ userId: user });  // Fetch shop items based on the user
//       res.status(200).json({ message: 'User in shops', user });
//       res.json(shopItems);  // Send shop items data
//     } catch (err) {
//       console.error('Error fetching shop items:', err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });

export default router;



