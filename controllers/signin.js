const handleSignin = (db,bcrypt)=>(req,res)=>{
const {email, password,name} = req.body;

if (!email||!password) {
	//alert('incorrect form submission')
	return res.status(400).json('incorrect form submission');
}

	db.select('email','hash').from('login')
	.where('email','=',email)
	.then(data =>{
		// hash = bcrypt.hashSync(req.body.password);
		const isValid = bcrypt.compareSync(password,data[0].hash);
		console.log(isValid)
		console.log(password)
		console.log(data[0].hash)
		// console.log(hash)
		//console.log(data[0])

		if (isValid){
			return db.select('*').from('users')
			.where('email','=',email)
			.then(user =>{
			res.json(user[0])
			})
			.catch(err=> res.status(400).json('unable to get user'))
		} else {
			res.status(400).json('wrong credentials1')
		}
	})
	.catch(err=> res.status(400).json('wrong credentials2'))
}


module.exports = {

	handleSignin: handleSignin
}