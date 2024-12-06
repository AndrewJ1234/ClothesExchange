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
    profession: { type: String, possibleValues: ['Amateur', 'In Training', 'Professional']}, 
    clothesToTrade: {type: [String], possibleValues: ['Pants', 'Shirts', 'Jackets']},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    trades: [{type: Object, required: true}]
  });

  const ShopSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    slug: {type: String},
    items: [{
      name: { type: String, required: true },
      price: { type: Number, required: true, min:[0, '{PATH} must be greater than {MIN}'] },
      image: {type: String},
      tag: {type: String, required: true}
    }]
  });

const User = mongoose.model('User', UserSchema);
const Shop = mongoose.model('Shop', ShopSchema);
// const Product = mongoose.model('Product', ProductSchema);

// ShopSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=name%>', lower: false});
UserSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=username%>', lower: false});

export { User, Shop};