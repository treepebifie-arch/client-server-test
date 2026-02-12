import express from 'express';
import { onBoardUser, loginUser, verifyAccount, resendOtp, updatedRole} from '../controller/user.controller.js';
import { signupSchema, loginSchema } from '../middleware/validation.js';
import { isAuth } from '../middleware/auth.js';
//import { isAuth } from '../middleware/Auth.js';

const router = express.Router();

router.post ('/signup', signupSchema, onBoardUser);
router.post ('/login', loginSchema, loginUser);
router.put ('/verify-account', verifyAccount);
router.put ('/resend-otp', resendOtp);
router.put ('/:id/make-admin', isAuth, updatedRole)

export default router;