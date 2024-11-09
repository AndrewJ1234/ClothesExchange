import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { User, Shop, Chat } from "./db.mjs";
import session from 'express-session'
// const User = mongoose.model("User");
// const User = mongoose.model("User");
// const Chat = mongoose.model("Chat");
// const Shop = mongoose.model("Shop");

// watch a youtube video on this, secure cookie session connection
// testing

const startAuthenticatedSession = (req, user) => {
  return new Promise((fulfill, reject) => {
    req.session.regenerate((err) => {
      if (!err) {
        req.session.user = user;
        fulfill(user);
      } else {
        reject(err);
      }
    });
  });
};

// testing
const endAuthenticatedSession = (req) => {
  return new Promise((fulfill, reject) => {
    req.session.destroy((err) => (err ? reject(err) : fulfill(null)));
  });
};

const register = async (username, email, password, clothesToTrade, profession, slug) => {
    const usernameExpressions = /[a-zA-Z0-9]{8,}$/;
    if (!username.match(usernameExpressions)) {
      throw new Error("Username must be at least 8 characters long and can only contain letters and numbers.");
    }
  
    const passwordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!password.match(passwordExpression)) {
      throw new Error("Password must be at least 8 characters long and include special symbols, uppercase letters, numbers, and lowercase letters.");
    }
  
    // const emailExpression = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // if (!email.match(emailExpression)) {
    //   throw new Error("Please provide a valid email address.");
    // }
  
    const existingUser = await User.findOne({ username: username }).exec();
    if (existingUser) {
      throw new Error("USERNAME ALREADY EXISTS");
    }
  
    const existingSlug = await User.findOne({ slug }).exec();
    if (existingSlug) {
      throw new Error("Slug already exists, please try another.");
    }
  
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const user = new User({
      username,
      password: hashedPassword,
      email,
      clothesToTrade,
      profession,
      slug,
    });
  
    await user.save();
    return user;
  };

const login = async (username, password) => {
  const existingUser = await User.findOne({ username: username }).exec();
  console.log(existingUser);
  if (!existingUser.username) {
    throw { message: "USER NOT FOUND" };
  } else if (!bcrypt.compareSync(password, existingUser.password)) {
    // console.log(bcrypt.compareSync(password, existingUser.password)) debugging
    // console.log(password) debugging
    throw { message: "PASSWORDS DO NOT MATCH" };
  } else {
    return await existingUser;
  }
};

export { startAuthenticatedSession, endAuthenticatedSession, register, login };
