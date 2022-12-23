import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { validate } from "../utility/validate.js";

/**
 * auth redirect middlewares
 */
export const authRedirectMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (token) {
      const tokenCheck = jwt.verify(token, process.env.JWT_SECRET);

      if (tokenCheck) {
        const userData = await User.findById(tokenCheck.id);

        if (userData) {
          next();
        } else {
          delete req.session.user;
          res.clearCookie("authToken");
          validate("Token user not found", "/login", req, res);
        }
      }
    } else {
      delete req.session.user;
      res.clearCookie("authToken");
      validate("Auth token not found", "/login", req, res);
    }
  } catch (error) {
    delete req.session.user;
    res.clearCookie("authToken");
    validate("Invalid Token", "/login", req, res);
  }
};
