Milestone 02
===

Repository Link
---
[ClozExchange](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234)

Special Instructions for Using Form and / or Login
---

# Starting the Application After Cloning from GitHub

After cloning the application, use the following steps to start it:

1. **Navigate to the project directories** and install/build the necessary components:

    ```bash
    cd frontend
    cd cloz-exchange-front-end
    npm run build
    npm install serve
    ```

2. **Run the application** using `pm2` to serve the frontend on port `20942`:

    ```bash
    npx pm2 start "npx serve -s dist -l 20942" --name cloz-exchange-front-end
    ```


### When registering:
- **Username**: Must be at least 8 characters long and only contain letters (A-Z, a-z) and numbers (0-9).
- **Email**: Must not be empty. An `@` symbol must appear before the `.` symbol, and there must be at least 2 characters after the last `.` in the email.
- **Password**: Must be at least 8 characters long, and contain at least one number and one special character (`!@#$%^&*`).
- **Clothing**: Select at least one clothing piece from the list of options (pants, jackets, shirts).
- **Profession**: Select one profession from the following options:
  - Amateur
  - In-training
  - Professional

### Additional Instructions:
- Clicking on **Home** again when you are in `http://linserv1.cims.nyu.edu:20942/:username` allows you to re-register for another account or re-sign into your account.

URL for deployed site
---
http://linserv1.cims.nyu.edu:20942

URL for form 
---
[functioning form](http://linserv1.cims.nyu.edu:20942/)

URL for form result
---
[results of submitting form](http://linserv1.cims.nyu.edu:20942/:username)

URL to github that shows line of code where research topic(s) are used / implemented
--- 

### React Research Topic
[Login Page in React](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/5d936e478f6d5afdba39fc7956aec5a4b821009c/front-end/cloz-exchange-front-end/src/components/LoginPage.jsx#L11C1-L115C26)

[Navbar in React](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/5d936e478f6d5afdba39fc7956aec5a4b821009c/front-end/cloz-exchange-front-end/src/components/Navbar.jsx#L8C1-L64C2)

[show/hide password in registration/login form component](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/5d936e478f6d5afdba39fc7956aec5a4b821009c/front-end/cloz-exchange-front-end/src/components/VisiblePassword.jsx#L5C1-L22C32)

[App.jsx, that contains all the routing of pages](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/5d936e478f6d5afdba39fc7956aec5a4b821009c/front-end/cloz-exchange-front-end/src/App.jsx#L11C1-L31C19)

[Registration page](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/5d936e478f6d5afdba39fc7956aec5a4b821009c/front-end/cloz-exchange-front-end/src/pages/Register.jsx#L8C1-L256C2)

### Axios Research Topic

[Using axios to send data from React to Express when registering](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/5d936e478f6d5afdba39fc7956aec5a4b821009c/front-end/cloz-exchange-front-end/src/pages/Register.jsx#L34C3-L45C5)

[Using axios to send data from React to Express when logging into the application](
    https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/5d936e478f6d5afdba39fc7956aec5a4b821009c/front-end/cloz-exchange-front-end/src/components/LoginPage.jsx#L42C1-L53C5
)

References 
---

[referenced register, login and startAuthenticatedSession and endAuthenticatedSession functions from hw5](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/1d397814d70e9815400c90959a18cff84dce614c/src/auth.mjs#L85)

[referenced how to redirect using the navigate function](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/1d397814d70e9815400c90959a18cff84dce614c/front-end/cloz-exchange-front-end/src/pages/Register.jsx#L25C1-L31C4)

[referenced handling client-side validation](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/1d397814d70e9815400c90959a18cff84dce614c/front-end/cloz-exchange-front-end/src/pages/Register.jsx#L57C1-L94C5)

[referenced how to do login, register page](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/256dd75b5727db72ece258bef62467ee3d515a8e/front-end/cloz-exchange-front-end/src/pages/Register.jsx#L130C1-L170C4)

[referenced the register/login css styling](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/256dd75b5727db72ece258bef62467ee3d515a8e/front-end/cloz-exchange-front-end/src/pages/Register.css#L3C1-L126C4)

[https://stackoverflow.com/questions/71679442/show-hide-multiple-password-in-react-js](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/256dd75b5727db72ece258bef62467ee3d515a8e/front-end/cloz-exchange-front-end/src/components/VisiblePassword.jsx#L15C5-L19C15)

[https://www.youtube.com/watch?v=I2UBjN5ER4s](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/256dd75b5727db72ece258bef62467ee3d515a8e/front-end/cloz-exchange-front-end/src/components/Navbar.jsx#L8C2-L52C3)

[https://www.youtube.com/watch?v=I2UBjN5ER4s](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/5d936e478f6d5afdba39fc7956aec5a4b821009c/front-end/cloz-exchange-front-end/src/components/Navbar.css#L2C1-L100C2)

[https://www.youtube.com/watch?v=vWcyisPuTOA](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJ1234/blob/5d936e478f6d5afdba39fc7956aec5a4b821009c/front-end/cloz-exchange-front-end/src/components/LoginPage.jsx#L76C6-L113C3)
