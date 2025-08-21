import { Router } from "express";
import {signUp} from "../Controllers/AuthController.js";
import { signUpValidation } from "../Middlewares/AuthValidation.js";

import { login } from "../Controllers/AuthController.js";
import { loginValidation } from "../Middlewares/AuthValidation.js";
const AuthRouter = Router();

AuthRouter.post("/login", loginValidation, login);

AuthRouter.post("/signup", signUpValidation, signUp);


export default AuthRouter;


