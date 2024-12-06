Milestone 04 - Final Project Documentation
===

NetID
---
aj3556

Name
---
Andrew Jiang

Repository Link
---
[GitHub Repository](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234)

URL for deployed site 
---
`http://linserv1.cims.nyu.edu:20942`

## URL for Form 1 (from previous milestone)
[Register/Login Form](http://linserv1.cims.nyu.edu:20942/register)

### Special Instructions for Form 1:
1. When you are logging in or registering, scroll all the way to the bottom of the page to switch between logging in and registering.
2. Once logged in, refresh the page, and the URL will display the username slug in the URL.
3. To sign out, hover over the profile picture icon, click on "Sign out," and you will be redirected to the register page where you can either log in again or register a different account.
4. When signing in, the page will redirect to a random homepage. To access your user information, reload the application to view your categories, shops, etc.

## URL for Form 2 (for current milestone)
[My Shop](http://linserv1.cims.nyu.edu:20942/myshops/:username?)

### Special Instructions for Form 2
1. When you are signed in, click on "Shop".
2. Click "Create Product."
3. Fill in all the input fields, ensuring that the URL is a valid image and not a website.
4. The products that will be added or already exist in the list can be seen in the "Shops" page.

URL for form 3 (from previous milestone) 
---
[Trades](http://linserv1.cims.nyu.edu:20942/trades/:username?)

### Special Instructions for Form 3
1. When you are signed in, click on "Categories". 
2. Click on trade for a specific clothing, 
3. Select the piece of clothing you would like to trade with that user
4. Fill in all input fields and then select confirm trade
5. Once the trade has been confirmed, you will be redirected to the trades page
6. The trades page shows all trades that have been made

First link to github line number(s) for constructor, HOF, etc.
---
[sortByLen HOF](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/1fca1e6dca316758d7df789c8eb1f38cc1d103ad/front-end/cloz-exchange-front-end/src/pages/Categories.jsx#L117-L122)

Second link to github line number(s) for constructor, HOF, etc.
---
[handleSubmit HOF](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/1fca1e6dca316758d7df789c8eb1f38cc1d103ad/front-end/cloz-exchange-front-end/src/pages/Categories.jsx#L30-L51)

Short description for links above
---
1. sortByLen is a hof that sorts a 2d-array based on the lengths of its sub-arrays. It essentially returns a comparator function for sorting. 

2. handleSubmit is a hof that takes in two arguments: navigation function and axiosCall function. Once the handleSubmit is called, the program makes an axios call and navigates to another page. In this case, handleSubmit makes a post request to `${import.meta.env.VITE_BACKEND_URL2}/api/trades/${username}` to update the user's trades and also update the trader's trades. After, handleSubmit will navigate to the trades page where it will display all the user's trades that have been made. 

Link to github line number(s) for schemas (db.js or models folder)
---
[(Schemas)](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/6730e754d468f9381ed76e60531a97008985efed/back-end/src/models/db.mjs)

Description of research topics above with points
---
* (6 points) React.js
    * used React.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points
* (2 points) Connect React to Express via Axios
    * send data back and forth to React and Express servers and vice versa using Axios
* (1 point) Tailwind CSS
    * use Tailwind CSS; it's a challenging framework to learn
  
9 points total out of 8 required points

Links to github line number(s) for research topics described above (one link per line)
---

### React

[Categories Page](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/6730e754d468f9381ed76e60531a97008985efed/front-end/cloz-exchange-front-end/src/pages/Categories.jsx#L8-L261)

[Trades Page](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/6730e754d468f9381ed76e60531a97008985efed/front-end/cloz-exchange-front-end/src/pages/Trades.jsx#L5-L43)

### Axios

[Categories page axios post request method](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/be47e2d6762e296d1f47d1acb2dd1ab5af5a2d68/front-end/cloz-exchange-front-end/src/pages/Categories.jsx#L30-L33)

[Trades page axios get request method](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/be47e2d6762e296d1f47d1acb2dd1ab5af5a2d68/front-end/cloz-exchange-front-end/src/pages/Trades.jsx#L10-L20)

### Tailwind CSS

[Categories Page CSS](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/be47e2d6762e296d1f47d1acb2dd1ab5af5a2d68/front-end/cloz-exchange-front-end/src/pages/Categories.jsx#L134-L234)

[Trades Page CSS](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/6730e754d468f9381ed76e60531a97008985efed/front-end/cloz-exchange-front-end/src/pages/Trades.jsx#L26-L33)

Optional project notes 
--- 
(TODO: optionall add add any other information required for using/testing the final project)

Attributions
---
(TODO:  list sources that you have based your code off of, 1 per line, with file name, a very short description, and an accompanying url... for example: routes/index.js - Authentication code based off of http://foo.bar/baz ... alternatively, if you have already placed annotations in your project, answer "See source code comments")


