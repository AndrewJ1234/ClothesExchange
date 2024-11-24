import 'dotenv/config.js'
import '../../config.mjs'
import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';
console.log(process.env.MONGODB_URI)
mongoose.connect(`${process.env.MONGODB_URI}`);

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    shops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }],
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    profession: { type: String, possibleValues: ['Amateur', 'In Training', 'Professional']}, 
    clothesToTrade: {type: [String], possibleValues: ['Pants', 'Shirts', 'Jackets']},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });

  const ShopSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    slug: { type: String, required: true },
    items: [{
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: {type: String}
    }]
  });

  const ProductSchema = new mongoose.Schema({
    title: { 
      type: String, 
      required: true, 
      unique: true 
    },
    image: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    },
    stock: { 
      type: Number, 
      default: 0 
    },
    category: { 
      type: String, 
      required: true 
    },
    shop: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Shop', 
      required: true 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: { 
      type: Date, 
      default: Date.now 
    }
  });

const User = mongoose.model('User', UserSchema);
const Shop = mongoose.model('Shop', ShopSchema);
const Product = mongoose.model('Product', ProductSchema);
// const Chat = mongoose.model('Chat', ChatSchema);

ShopSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=name%>' });
UserSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=username%>' });
ProductSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=shopName%>' });
// ChatSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=withUser%>' });

export { User, Shop, Product};