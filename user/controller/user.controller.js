const userModel = require('../models/user.model');
const blacklisttokenModel = require('../models/blacklisttoken.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.register = async (req,res)=>{
    try {
        const {name,email,passsword} = req.body;
        // find if user exists
        const user = await userModel.findOne({email});
        
        // check if user exists
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        const hashPassword = bcrypt.hash(passsword,10);
        // initializing the model
        const newUser = new userModel({name,email,password});
        
        // save the user
        await newUser.save();

        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1h'});

        res.cookie('token',token);

        res.status(201).json({message:"User registered successfully"});

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports.login = async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const isMatch = await bcrypt.compare(user.password,password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        
        res.cookie('token',token);

        res.status(200).json({message:"User logged in successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


module.exports.logout = async (req,res)=>{
    try {
        const token = req.cookies.token;
        await blacklisttokenModel.create({token});
        res.clearCookie('token');
        res.send({message:'User logged out successfully'});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports.profile = async (req,res){
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
