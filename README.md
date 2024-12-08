# ClozExchange 

## Overview

Clothes has become a staple. And some clothes will continue to be fashionable while others won't be. How can we create a sustainable way to dress well instead of promoting fast fashion. 

ClozExchange is a web app that allows users to trade clothes with other users. Users can register and login. Once they're logged in, they can promote which clothes they want to trade with others. Every user has a shop under a category of clothing where they showcase their clothes that they would like to trade with others, they can add and remove items from the shop. This promotes a more sustainable approach and also promotes good fashion (embodying the idea of thrifting and bartering but combined).

## Data Model

The application will store Users, 

* Users can have multiple shops (based on the category of clothing: shirts, shorts, pants.)
* Each shop can have multiple clothing items (by embedding) and is associated with a specific clothing category

An Example User:

```javascript
{
  username: "bennytrader",
  hash: // a password hash,
  shops: // an array of references to Shop documents
  chats: // an array of references to Chat documents
  reviews: // an array of references to User's Reviews documents
  profession: 'Amateur'
}
```

An Example List with Embedded Items:

```javascript
{
  user: // a reference to a User object
  shops: [
    {
      name: "pants",
      items: [
        { name: "Jeans", quantity: 20, checked: false },
        { name: "Chinos", quantity: 10, checked: false }
      ]
    },
    {
      name: "shirts",
      items: [
        { name: "T-shirts", quantity: 15, checked: false },
        { name: "Dress shirts", quantity: 5, checked: false }
      ]
    }
  ],
}
``` 

## [Link to Commented First Draft Schema](src/db.mjs) 

## [Wireframes](https://www.figma.com/design/99dIYCjyoACnFUPb4f8RNp/Untitled?node-id=37-2&t=l5TFQG02U1OAv6QA-1)

<div align="center">

### /myshops/:username - **Page for creating a new clothes piece to trade**
![created a specific clothes](documentation/create-clothes.png)  


</div>

### /login - **Login page**
![user login](documentation/login.png)  
</div>

<div align="center">

### /register - **Register page**
![register](documentation/register.png)  


</div>

<div align="center">

### /categories/slug - **Trade your clothes for another piece of clothing**
![trade your clothes for another piece of clothing](documentation/trade-username-slug.png)  


</div>

<div align="center">

### /trades/slug - **Browse through clothes to trade from a particular category of clothing**
![browse through clothes to trade](documentation/trade-slug-category.png)  


</div>

## Site map
![Site Map](documentation/site-map.png)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new shop
4. as a user, I can view my shop
5. as a user, I can add items to my shop shop
6. as a user, I can preview other user's items
7. as a user, I can trade/barter my clothes for other user's clothes

## Research Topics

* (6 points) React.js
    * used React.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points
* (2 points) Connect React to Express via Axios
    * send data back and forth to React and Express servers and vice versa using Axios
* (1 point) Tailwind CSS
    * use Tailwind CSS; it's a challenging framework to learn
  
9 points total out of 8 required points

## [Link to Initial Main Project File](app.mjs) 

## Annotations / References Used

[React Website Tutorial](https://www.youtube.com/watch?v=I2UBjN5ER4s)

[Bcrypt Documents](https://www.npmjs.com/package/bcrypt)

<!-- [Multi-Factor Authentication with Google](https://esketchers.com/implementing-2fa-with-mern-stack/) -->

[React Login Tutorial](https://www.youtube.com/watch?v=vWcyisPuTOA)

[javascript regex for special characters](https://stackoverflow.com/questions/18812317/javascript-regex-for-special-characters?newreg=a702b9efd3ef460dbb38b461d3210fff)

[How create a field in mongodb schema with pre-defined values, and make the user choose the value with a radio button](https://stackoverflow.com/questions/28566996/how-create-a-field-in-mongodb-schema-with-pre-defined-values-and-make-the-user)

[react button onClick redirect page](https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page)

[How do I add validation to the form in my React component?](https://stackoverflow.com/questions/41296668/how-do-i-add-validation-to-the-form-in-my-react-component)

[Show hide multiple password in react js](https://stackoverflow.com/questions/71679442/show-hide-multiple-password-in-react-js)

[react-login-page](https://www.npmjs.com/package/react-login-page)

[localhost:5173/login](https://locall.host/5173-login/)

[Implementing Slugs in React using useParams Hook.](https://www.linkedin.com/pulse/implementing-slugs-react-using-useparams-hook-adyatan-guragain-1jmsc/)

[How To Make Complete E-Commerce Website Using React JS | React JS Ecommerce Project 2024](https://www.youtube.com/watch?v=ZF73dpgRrWI)

[Login and Registration using MERN Stack | Mongo, Express, React and Node Authentication](https://www.youtube.com/watch?v=ZVyIIyZJutM)

[How To Make Complete E-Commerce Website Using React JS | React JS Ecommerce Project 2024](https://www.youtube.com/watch?v=ZF73dpgRrWI&t=17215s)
