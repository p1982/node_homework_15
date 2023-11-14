import UsersService from "../../bll/users/users.service.ts";
import passport from "passport";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { Service } from "typedi";
import express from "express";
import { AppError, ValidationError } from "../utils/customErrors.ts";
import logger from "../utils/logger.ts";
//import { RequestWithUser } from "../../types/express.extention";
import { verifyToken } from "../middlewares/auth.middleware.ts";
import auth from "../middlewares/auth.passport.middlewate.ts";
import { Cookie } from "express-session";

@Service()
class AuthController {
  private privateKey = "QWE123";
  public path = "/auth";
  public router = express.Router();

  private tokenStorage: Record<string, string> = {};

  constructor(private usersService: UsersService) {
    // this.initializeValidators();
    this.initializeRoutes();
  }

  // public initializeValidators() {
  //   const ajv = new Ajv({ allErrors: true });
  //   addFormats(ajv);
  //   this.postValidator = ajv.compile(postsSchema);
  // }

  public initializeRoutes() {
    this.router.get("/privatetest", verifyToken, this.privateTest);
    this.router.post("/login", this.loginJWT);
    this.router.post("/register", this.registerJWT);
    this.router.post("/refresh", this.refreshJWT);
    this.router.post("/pass/login", auth.optional, this.loginPass);
    this.router.get("/pass/current", auth.required, this.privateTest);
  }

  privateTest = (request: express.Request, response: express.Response) => {
    // response.send({
    //   message: "Hi from private route",
    //   user: request["auth"],
    // });
  };

  loginPass = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    passport.authenticate(
      "local",
      { session: false },
      (err: any, passportUser: any, info: any) => {
        if (err) {
          return next(err);
        }

        if (passportUser) {
          const user = passportUser;

          user.token = jwt.sign(
            { user_id: user.id, email: user.email },
            "QWE123",
            {
              expiresIn: "2h",
            }
          );

          user.password = "";

          return response.json({ user });
        }

        return response.status(400).send(info);
      }
    )(request, response, next);
  };

  refreshJWT = async (request: express.Request, response: express.Response) => {
    const { email, token } = request.body;

    const user = await this.usersService.getUserByEmail(email);
    if (token && this.tokenStorage[token]) {
      const refreshToken = this.tokenStorage[token];
      const decoded = jwt.verify(refreshToken, "refreshsecret");
      const newtoken = jwt.sign({ user_id: user.id, email }, this.privateKey, {
        expiresIn: "15m",
      });

      this.tokenStorage[newtoken] = refreshToken;
      response.status(200).json({
        token: newtoken,
      });
    } else {
      response.status(404).send("Invalid request");
    }
  };

  loginJWT = async (request: express.Request, response: express.Response) => {
    const { email, password } = request.body;

    const user = await this.usersService.getUserByEmail(email);
    console.log(user);
    console.log(password);
    if (user && user.password && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user.id, email }, this.privateKey, {
        expiresIn: "15m",
      });

      const refreshToken = jwt.sign({ token }, "refreshsecret", {
        expiresIn: "24h",
      });

      this.tokenStorage[token] = refreshToken;

      delete user.password
      response.cookie(
        "token",
        { ...user, token },
        { maxAge: 900000, httpOnly: true }
      );
      return response.status(200).json({ ...user, token, refreshToken });
    }
    response.status(400).send("Invalid Credentials");
  };

  registerJWT = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { email, password } = request.body;
    const oldUser = await this.usersService.getUserByEmail(email);
    if (oldUser) {
      return response.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword);
    const user = await this.usersService.createAUser({
      email: email,
      password: encryptedPassword,
    });

    const token = jwt.sign({ user_id: user.id, email }, this.privateKey, {
      expiresIn: "2h",
    });

    user.password = "";

    response.status(200).json({ ...user, token });
  };
}

export default AuthController;