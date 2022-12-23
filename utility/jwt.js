import jwt from "jsonwebtoken";

// Create a token
export const createToken = (payload, exp = 86400000) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: exp,
  });
  return token;
};

// Verify token
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
