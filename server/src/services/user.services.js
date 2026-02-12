import User from '../models/user.models.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import AppError from '../utils/AppError.js';



class userServiceActivities {

    async generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async generateOtpExpiry() {
        const expiry = new Date (Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
        return expiry;
    }


    async createUser(userData) {
        const { email,  password, name } = userData;

        // check for existing user
        const existingUser = await User.findOne({email});

        if (existingUser) {
            throw new AppError(409, "Identity conflict: Email already taken");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        //Generate OTP and expiry
        const otp = await this.generateOtp();
        const otpExpiry = await this.generateOtpExpiry();

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiry
        });

        // Return user without sensitive fields
        return User.findById(newUser._id).select("-password -otpExpiry");
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new AppError (404, "User does not exist");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError(401, "Invalid user credentials");
        }

        if (!user.isVerified) {
            throw new AppError(403, "Account not verified. Please verify your account to log in.");
        }

        // Generate token
        const token = jwt.sign({ role: user.role, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return {token, role: user.role};

        // Remove sensitive data before returning
        const loggedInUser = await User.findById(user._id).select("-password -otp -otpExpiry");
        return {user: loggedInUser, token};
    }

    async verifyAccount(email, otp) {
        const user = await User.findOne({ email });

        if (!user) throw new AppError(404, "User not found");
        if (user.isVerified) throw new AppError(400, "Account already verified");
        
        // Check if OTP matches and hasn't expired
        if (user.otp !== otp) throw new AppError(400, "Invalid OTP");
        if (new Date() > user.otpExpiry) throw new AppError(400, "OTP has expired");

        user.isVerified = true;
        user.otp = null; // Clear OTP once used
        user.otpExpiry = null;
        await user.save();

        return user;
    }

    async resendOtp(email) {
        const user = await User.findOne({ email });
        if (!user) throw new AppError(404, "User not found");

        const newOtp = await this.generateOtp();
        const newOtpExpiry = await this.generateOtpExpiry();

        user.otp = newOtp;
        user.otpExpiry = newOtpExpiry;
        await user.save();

        return user.otp;
    }
    
    // Promote A User To Admin (Admin Only)
    async promoteUserToAdmin (role, userId) {

        if ( role !== 'admin') {
            throw new AppError(403, 'access denied')
        }
        const updateUser = await User.findByIdAndUpdate(
            userId, 
            { role: 'admin' },
            { new: true }
        );
        if (!updateUser) {
            throw new AppError (404, 'Account not found' );
        }
        if (!updateUser.isVerified) {
            throw new AppError (404, 'Cannot make Admin, please verify your account first')
        }
        
        return updateUser;
    }
};



export default userServiceActivities;