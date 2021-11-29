
const express = require("express");
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
const app = express();
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.use("/login", (req, res, next) => {
  // const email = req.body['email'];

  const user = {
    name : req.body['username'],
    password : req.body['password']
  }
  console.log("values ",user.name.length)
  if(user.name == 0 || user.password == 0){
    console.log("Sorry")
    res.status(401).json({
      message: 'Unauthorized'
    })
  }

  jwt.sign(user, "privateKey", (err, token) => {
    res.status(200).json({
      message: "posts fetched successfully",
      token:token,
      data:user.name
    });
  });
});

app.post('/details', verifyToken, (req, res) => {
  console.log("req.body ",req.headers['authorization'])
  jwt.verify(req.token, 'privateKey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});
// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

module.exports = app;
