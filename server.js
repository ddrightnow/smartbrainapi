const express = require('express');
const bodyParser = require('body-parser');
const bcrypt= require('bcrypt-nodejs');

const app = express();
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1', //this number same as localhost on ur pc
    user : 'postgres',
    password : 'dimudon9',
    database : 'smartbrainapi'
  }
});


app.use(cors());

app.use(bodyParser.json());
//ap.use done after app has been created. and it is ap.use cus it is a middleware

// console.log (db.select('*').from('users'));

// db.select('*').from('users')
// .then(data => console.log(data));

// const database ={
// 	users :[
// 		{
// 			id: '123',
// 			name: 'paul',
// 			email: 'paul@q.com',
// 			password: '456',
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id: '124',
// 			name: 'saul',
// 			email: 'sssa@qwe.co.uk',
// 			password: '789',
// 			entries: 0,
// 			joined: new Date()
// 		}
// 	],
// 	login: [
// 	{
// 		id:'987',
// 		hash: '',
// 		email: 'aa@qwe.co.uk'
// 	}]
// }

app.get('/', (req,res)=>{
	res.send(database.users)
})


app.post('/signin',signin.handleSignin(db,bcrypt) )


	// Load hash from your password DB.
// if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
// 		res.json(database.users[0])
// 	} else {
// 	res.status(400).json('error logging in')}


// bcrypt.compare("12456", '$2a$10$XYAqjgquodogYBGe/mBgKeRYB2KIcEae3eFls5.J5KHGgzlQetakW', function(err, res) {
// 	console.log('FIRST gUESS', res('sucess'))
// });
// bcrypt.compare("veggies", '$2a$10$XYAqjgquodogYBGe/mBgKeRYB2KIcEae3eFls5.J5KHGgzlQetakW', function(err, res) {
//     console.log('2nd gUESS', res('bad'))
// });


	// if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
	// 	res.json('sucess')
	// } else {
	// res.status(400).json('error logging in')}


app.post('/register',(req,res)=> {register.handleRegister(req,res,db,bcrypt)})


// bcrypt.compareSync("bacon", hash); // true
// bcrypt.compareSync("veggies", hash); // false


	// bcrypt.hash(password, null, null, function(err, hash) {
    // console.log(hash);
	// });

	

app.get('/profile/:id',(req,res)=> {profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res)=> {image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=> {image.handleApiCall(req,res,db)})



app.listen(3000,()=>{
	console.log('app is running on port 3000')
});





/*  thinking kind of requests our app will make and how we want the server to respond

/ --> res = this is working
/signin --> POST respod either sucess of fail;; one of the reaso why we use POST here is taht we are sending a password which we dot want to send as a query string. so it is hidden from man in the middle attacks.
/register --> POST = user (new user object)
/profile/:userId--> GET ==user; userId will be an optional parameter to identify the user.
/image --> PUT --> user updated user object or count

*/