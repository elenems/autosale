const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
app.use(cors());

const {getCars, getCar, getUserCars, addCar, removeCar, updateCar} = require('./handlers/cars')
const {signUp, signIn, signOut, changeUserInfo, getUser} = require('./handlers/users')

//user
app.post('/signUp', signUp)
app.post('/signIn', signIn)
app.post('/signOut', signOut)
app.post('/changeUserInfo', changeUserInfo)
app.get('/getUser', getUser)

//cars
app.get("/getCars", getCars)
app.get("/getCar", getCar)
app.get("/getUserCars", getUserCars)
app.post('/addCar', addCar)
app.post('/removeCar', removeCar)
app.post('/updateCar',updateCar)

exports.api = functions.region('europe-west1').https.onRequest(app);