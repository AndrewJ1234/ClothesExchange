import 'dotenv/config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import './config.mjs';
import './src/models/db.mjs';
import * as auth from './src/auth.mjs';
import userRoutes from './src/routes/user.mjs';
import categories from './src/routes/categories.mjs'
import myshops from './src/routes/myshops.mjs'
import trades from './src/routes/trade.mjs'
import session from 'express-session';
import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';

const User = mongoose.model('User');

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS middleware
const corsOptions = {
  origin: 'http://localhost:20942',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

app.use(express.json());
app.use(session({
  secret: `${process.env.SESSION_SECRET}`,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

// Add user routes
app.use('/api/users/', userRoutes);
app.use('/api/shops', myshops);
app.use('/api/categories', categories);
app.use('/api/', trades);

// Debug logging for requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Default route
app.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  console.log('params', req.params);

  // Now you can populate the 'user' field if it exists in your schema
  const home = await User.findOne({ slug })
    .populate('user')  // Populate user if the user field is defined in the schema
    .populate('shops')

  if (!home) {
    return res.status(404).send("User not found");
  } else {
    res.send(home);
  }
});


app.get('/categories/:slug' , async (req, res) => {
  
  const {slug} = req.params;
  const userCategories = await User.findOne({slug}).populate('user');

  if(!userCategories){
    return res.status(404).send("User's categories not found")
  }
  else{
    res.send("Categories are loaded into user's shop")
    // send shops so that user can view it
  }
})

app.get('/myshops/:slug' , async (req, res) => {
  const {slug} = req.params;
  const userShops = await User.findOne({slug}).populate('user');

  if(!userShops){
    return res.status(404).send("User's shop not found")
  }
  else{
    res.send("Shop is loaded into user's shop")
    // send shops so that user can view it
  }

})


// Start server
const PORT = process.env.EXPRESS || 20943;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
