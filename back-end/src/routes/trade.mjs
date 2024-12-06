import "dotenv/config.js";
import express from "express";
import sanitize from "mongo-sanitize";
import mongoose from "mongoose";
import mongooseSlugPlugin from "mongoose-slug-plugin";
import { User, Shop } from "../models/db.mjs";
import * as auth from "../auth.mjs";
const router = express.Router();
let userTrades = [];

// traded item from other user
// piece of clothes that you traded
router.post("/trades/:username", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  //   console.log(req.body); prints out body
  try{
    const data = req.body;
  //   console.log('hello', data);
  const user = data.user.username;
  const userTradedImg = data.user.item;
  const shop = await Shop.find();
  const traderUser = data.traderUser;
  const traderUserClothes = data.traderUserClothes;
  let userShop = {};
  let traderUserShop = {};
  const userMongo = await User.findOne({username: user});
  const traderMongo = await User.findOne({username: traderUser});
  const userShopMongo = await Shop.findOne({userId: userMongo._id});
  const traderShopMongo = await Shop.findOne({userId: traderMongo._id});

  shop.filter((op) => {
    if (op.slug === `${user}-shop`) {
      // console.log('op', op)
      userShop = op.items;
    }
    if (op.slug === `${traderUser}-shop`) {
      traderUserShop = op.items;
    }
  });
//   console.log('user', userMongo);
//   console.log('user shop', userShopMongo);
//   console.log('trader shop', traderShopMongo);

  userShop = userShop.filter((item) => {
    if (item.image !== userTradedImg) {
        // console.log('normal item', item);
        return item;
    } else {
        traderUserShop.push(item);
        // console.log('item', item)
        traderMongo.trades.push(item);
        traderMongo.updateOne(item);
    }
  });
  userShop.push(traderUserClothes); // adds traded clothes to user
  userMongo.trades.push(traderUserClothes);
  userMongo.updateOne(traderUserClothes);


  traderUserShop = traderUserShop.filter((item) => {
    if (item.image !== traderUserClothes.image) {
      return item;
    }
  });

  // update userTraders, userTradedWith
  // update both of their shops and trade arrays
//   console.log(userShopMongo);
//   console.log(traderShopMongo);
  userShopMongo.items = userShop;
//   User.updateOne({userId: userShopMongo._id, items: {userShop}});
  traderShopMongo.items = traderUserShop;
//   User.updateOne({userId: traderShopMongo._id, items: {traderUserShop}});

//   console.log('mongo user', userMongo)
//   console.log('mongo trader', traderMongo)

//   console.log("after userShop changed", userShop);
//   console.log("after trader changed", traderUserShop);
//   console.log("userTrades", userTrades);
//   userTrades.push(traderUserClothes);

await userMongo.save({ session });
    await traderMongo.save({ session });
    await userShopMongo.save({ session });
    await traderShopMongo.save({ session });


await session.commitTransaction();
  res.send({ message: "Successfully Traded" });
  }
  catch(e){
    console.error(e);
  }
  
});

router.get("/trades/:username", async (req, res) => {
    try{
        const {username} = req.params;
        console.log("llo");
  //   res.send(userTrades);
        const user = await User.findOne({username}).exec();
        console.log('user info', user)
        const allTrades = user.trades;
        console.log(allTrades);
        res.status(200).json({message: 'User Trades can be displayed', userTrades: allTrades})
        
    }
    catch(e){
        console.error(e)
    }
});

export default router;
