const Clarifai = require ('clarifai');

const app = new Clarifai.App({
 apiKey: 'ef9a74eb187f473696dcf4ef67c43a71'
});


const handleApiCall = (req,res)=>{
app.models
.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data =>{
	res.json(data);
})
.catch (err => res.status(400).res.json('unable to work with API'))
}

const handleImage = (req,res,db)=>

	{
const{id} = req.body;
	db('users')
	.where('id', '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0])
	})
	.catch(err=>res.status(400).json('error updating'))
	}

	module.exports = {

	 handleImage, handleApiCall
}