import { validate } from "../utility/validate.js";

/**
 * auth middleware
 */
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;
  if (token) {
    validate("", "/", req, res);
  } else {
    next();
  }
};
