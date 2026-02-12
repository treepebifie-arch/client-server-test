import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import userServiceActivities from '../services/user.services.js'
import AppError from '../utils/AppError.js';


const userService = new userServiceActivities();

// create New User
export const onBoardUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        
        const user = await userService.createUser({ name, email, password });
    
        res.success (user, 'User created successfully', 201,)
    } catch (err) {
        next(err);
    }
}

//login
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userService.login(email, password);

        res.success(user, 'login successful', 200);

    } catch (error) {
        next(error);
    }
};

//VerifyAccount
export const verifyAccount = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        
        await userService.verifyAccount(email, otp);

        res.success("Account verified successfully", 200 );
    } catch (error) {
        next(error);
    }
};


// ResendOtp
export const resendOtp = async (req, res, next) => {
    try {
        const { email } = req.body;

        const result = await userService.resendOtp(email);

        res.success(result,  "A new OTP has been sent to your email", 200,);
    
    } catch (error) {
        next(error);
    }
};


// Make a user an admin (admin Only)
export const updatedRole = async (req, res, next) => {
    const role = req.user.role;
    const { id: userId } = req.params;

    try {
    
        const updatedUser = await userService.promoteUserToAdmin(role, userId);

        res.success(updatedUser, `${updatedUser.name} is now an admin`, 200);

    } catch (error) {
        next (error)
    }
};
