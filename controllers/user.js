import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        
        if (!existingUser) res.status(404).json({ message : 'User does not exists' });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) res.status(400).json({ message : 'Password is not correct' });

        const token = jwt.sign(
            { email : existingUser.email, id : existingUser._id },
            process.env.SECRET_KEY
        );

        res.status(200).json({
            token,
            message : 'Logged In successfully'
        })
    } catch (error) {
        res.status(500).json({
            message : 'Something went wrong, Please try to sign in again'
        })
    }
}

const signUp = async (req, res, next) => {
    const { email, password, firstName, lastName, confirmedPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({
                message : 'User already exists'
            });
        }
        if (password !== confirmedPassword) {
            return res.status(400).json({
                message : "Password don't match"
            });
        }
        
        if (!firstName || !lastName || !password) {
            return res.status(400).json({
                message : 'first name, last name and password is required'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        const token = jwt.sign(
            { email : result.email, id : result._id },
            process.env.SECRET_KEY
        );

        res.status(200).json({
            token,
            message : "user created successfully"
        });
    } catch (err) {
        res.status(500).json({ message : 'Something went wrong, Please try to sign up again' });
    }
}

export { signIn, signUp };