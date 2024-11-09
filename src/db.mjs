import '../config.mjs'
import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';

mongoose.connect(`${process.env.MONGODB_URI}`);

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    shops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }],
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    profession: { type: String, possibleValues: ['Amateur', 'In Training', 'Professional']}, 
    clothesToTrade: {type: [String], possibleValues: ['Pants', 'Shirts', 'Jackets']}
  });

// const readUserProfession = () => {

// }

// const readUserClothesToTrade = () => {

// }

  const ShopSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        checked: { type: Boolean, default: false }
      }
    ]
  }, { timestamps: true });

//   const ReviewSchema = new mongoose.Schema({
//     reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     reviewedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     category: { type: String, required: true },
//     comment: { type: String, required: true },
//     checked: { type: Boolean, default: false }
//   }, { timestamps: true });
  
  const ChatSchema = new mongoose.Schema({
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    ],
    category: { type: String, required: true },
    lastMessageChecked: { type: Boolean, default: false },
  }, { timestamps: true });




// ArticleSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=title%>'});

const User = mongoose.model('User', UserSchema);
const Shop = mongoose.model('Shop', ShopSchema);
// const Review = mongoose.model('Review', ReviewSchema);
const Chat = mongoose.model('Chat', ChatSchema);

// const result = await User.find(); debugging
// console.log(result) debugging

ShopSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=name%>' });
UserSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=username%>' });
// ReviewSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=reviewer%>' });
ChatSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=withUser%>' });

export { User, Shop, Chat };