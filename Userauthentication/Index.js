const express =require('express');
const path=require('path');
const bcrypt=require('bcrypt');
const collection = require("./config");
const app=express();

// Converting data into JSON format
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// use EJS as the view engine
app.set('view engine','ejs');

//static file
//app.use('/static',express.static(__dirname+"/public"));
app.get('/style.css', (req, res) => {
	res.sendFile('/MEA(R)N Stack 6A10/testnode/public/style.css')
  })

app.get('/',(req,res)=>{
	res.render("login");
});

app.get('/signup',(req,res)=>{
	res.render("signup");
});


// User Registration

app.post("/signup",async(req,res)=>{
	const data={
		name: req.body.username,
		password: req.body.password
	}
	
	//check if the user is already is registered or not
	const existinguser = await collection.findOne({name: data.name});
	if(existinguser){
		res.send("User already register....!");
	}
	else{

		// hash the password using bcrypt

		const saltRounds= 10;
		const hashedPassword = await bcrypt.hash(data.password, saltRounds);
		data.password = hashedPassword; // replacing the original password with hashed password
		const userdata = await collection.insertMany(data);
	console.log(userdata);
	}
	
});

// User Login

app.post("/login",async(req,res)=>{
	try{
		const find= await collection.findOne({name: req.body.username});
		if(!find){
			res.send("user name cannot found....!");
		}

		// Comparing the hasedPassword from the database with plain text

		const isPasswordMath= await bcrypt.compare(req.body.password, check.password);
		if(isPasswordMatch){

			res.render("home");

		}
		else{
			res.send("Invalid Password....!")
		}
	}
	catch{
		res.send("wrong Details given...!")
	}
});

const port=3000;
app.listen(port,()=>{
	console.log(`server running on port: ${port}`)
});
