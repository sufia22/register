import bcrypt from "bcryptjs";

/**
 * Make a hash password
 */
export const hashPass = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
