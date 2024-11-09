import 'dotenv/config.js'
import express from 'express'

import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors';

import './config.mjs'
import './src/db.mjs';
import * as auth from './src/auth.mjs'

import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';
import axios from 'axios'

import session from 'express-session';
import url from 'url';
import bcrypt from 'bcrypt'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());

// cors might block requests
app.use(cors());
app.use(express.static(path.join(__dirname, 'front-end/cloz-exchange-front-end/')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/cloz-exchange-front-end/', 'index.html'));
  });

// // load register page
// app.get('/register', (req, res) => {
//     res.render('register');
//   });

// // load login page
// app.get('/login', (req, res) => {
//     res.render('login');
// });


app.use(session({
    secret: `${process.env.SESSION_SECRET}`,  
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));


// verify login information
app.post('/login', async (req, res) => {
    try {
      const user = await auth.login(
        sanitize(req.body.username), 
        req.body.password
      );
      await auth.startAuthenticatedSession(req, user);
    //   res.redirect('/'); 
    } catch(err) {
      console.log(err);
    //   res.render('login', {message: loginMessages[err.message] ?? 'Login unsuccessful'}); 
      res.status(400).json({message: loginMessages[err.message] ?? 'Login unsuccessful'});
    }
  });

  const generateSlug = (username) => {
    return username.toLowerCase().replace(/\s+/g, '-'); 
  };


// create new user
app.post('/register', async (req, res) => {
    try {
        const { username, email, password, clothesToTrade, profession } = req.body;
        // console.log('Registration data:', req.body);

        const slug = generateSlug(username);
        console.log(clothesToTrade)
        const newUser = await auth.register(
          sanitize(username), 
          sanitize(email), 
          password,
          sanitize(clothesToTrade),
          sanitize(profession),
          slug
        );

        await auth.startAuthenticatedSession(req, newUser);
        res.status(200).json({ message: 'Registration successful' });
    } catch (err) {
        console.log('Registration error:', err);
        res.status(400).json({ message: err.message || 'Registration error' });
    }
});

app.get('/', async (req, res) => {
    // res.redirect('/');
    res.send('pwease work');
})

// app.listen(process.env.PORT || 3000), () => {
//     console.log(`Server is running on port ${process.env.PORT || 3000}`);
// };


app.listen(process.env.EXPRESS, () => {
    console.log(`Server is running on http://localhost:${process.env.EXPRESS}`);
});

