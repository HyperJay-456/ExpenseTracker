import User from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';
const TOKEN_EXPIRES = '24h';

const createToken = (userId) => 
    jwt.sign({id: userId}, JWT_SECRET, {expiresIn: TOKEN_EXPIRES});

// register a user 
export async function registerUser(req, res) {
    const {name, email, password} = req.body;
    if ( !name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!!!"
        });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json ({
            success: false,
            message: "Email is Invaild, Please Enter a Valid Email"
        });
    }
    if (password.length < 8) {
        return res.status(400).json ({
            success: false,
            message: "Password must be atleast of 8 characters!!!!"
        });
    }

    try {
        if ( await User.findOne({email})) {
            return res.status(409).json({
                success: false,
                message: "User Already Exists!!!!!"
            }); 
        }
        
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashed});
        const token = createToken(user._id);
        res.status(201).json({
            success: true,
            token,
            user: {id: user.id, name: user.name, email: user.email}
        });

    }

    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// to login a user
export async function loginUser(req, res) {
    const {email, password} = req.body;
    if ( !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Both Fields are REQUIRED!!!!!!"
        });
    }
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({
                success: false,
                message:"Invalid Credentials!!!"
            });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message:"Invalid Credentials!!!"
            });
        }

        const token = createToken(user._id);
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } 
    
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// to get user login details
export async function getCurrentUser(req,res){
    try {
        const user = await User.findById(req.user.id).select("name email");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found!!!!"
            });
        }
        res.json({success: true, user});
    }

    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// to update a user profile 
export async function updateProfile(req, res) {
    const {name, email} = req.body;
    if(!name || !email || !validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Valid email and name are required!!!"
        });
    }

    try {
        const exists = await User.findOne({email, _id: {$ne: req.user.id }});
        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Email is already in use !!!!!"
            });
        }
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {name,email},
            {new: true, runValidators: true, select: "name email"}
        );
        res.json({
            success: true,
            user
        })
    }

    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// to change user password
export async function updatePassword(req, res) {
    const {currentPassword, newPassword} = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password Invalid or too short!!!"
        });
    }
    try {
        const user = await User.findById(req.user.id).select("password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found!!!"
            });
        }

        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Current Password is Incorrect!!!"
            });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({
            success: true,
            message: "Password Changed!!!"
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}