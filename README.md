# API Ed-Tech

The following is an Ed-Tech API it is Built using Node and Expres and uses the following Tools and Technologies 

### Tools and Technologies

- Node
- Express
- MongoDB
- Mongoose
- JSON Web Tokens
- bcrypt
- Cookies
- Postman

### modules

It has the following modules implemented 

#### Login/Registeration and User Profiling 
user can register, login, Edit or delete their account the passwords are encrypted at time of creation and stored in the database. The authentication is done through the help of JSON web Tokens which are stored and passed through Cookies. the routes that are allowed to be used by the current users role are only accesed 

#### Wallet and transactions 
user that has logged in can make transactions to their wallet they a topup withdraw and use the amount in the wallet to make purchases the user can the user can view their wallet and the transactions that they have made through the API. the API checks valid card credentials and then make the request.

#### enrolments
the Student can make request of enrolments to the owner of the course at the time of enrollment a balance is deducted from the wallet of the Student. the request is sent to the owner of the course who can accept or reject the request of the student if the owner of the course rejects the request of the student then the amount that the student paid is refunded and if the teacher accepts the request of the student then the amount that the student paid is credited to the wallet of the owner of the course.


### How to Run
- Install all the dependencies in package.json **npm install** 
- Run the API by either by **node app.js** or Nodemon using **npm start**
