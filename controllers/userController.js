import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { hashPass } from "../utility/hash.js";
import { validate } from "../utility/validate.js";
import { createToken } from "../utility/jwt.js";
import { accountActivationMail, passwordResetMail } from "../utility/mail.js";

/**
 * Profile Page
 */
export const profilePage = (req, res) => {
  res.render("profile");
};

/**
 * Login Page
 */
export const loginPage = (req, res) => {
  res.render("login");
};

/**
 * Register Page
 */
export const registerPage = (req, res) => {
  res.render("register");
};

/**
 * Register User
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    // validation
    if (!name || !email || !phone || !password) {
      validate("All fields are required", "/register", req, res);
    } else {
      const emailCheck = await User.findOne().where("email").equals(email);

      if (emailCheck) {
        validate("Email already exists !", "/register", req, res);
      } else {
        const user = await User.create({
          name,
          email,
          phone,
          password: hashPass(password),
        });
        const token = createToken({ id: user._id }, 1000 * 60 * 60 * 24 * 30);
        const activation_link = `${process.env.APP_URL}:${process.env.PORT}/activate/${token}`;
        accountActivationMail(email, {
          name: name,
          phone: phone,
          link: activation_link,
        });
        validate("User registration successfull", "/login", req, res);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Login User
 */
export const loginUser = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if (!email || !password) {
      validate("All fields are required", "/login", req, res);
    } else {
      const loginUser = await User.findOne().where("email").equals(email);

      if (!loginUser) {
        validate("Email not exists !", "/login", req, res);
      } else {
        if (!loginUser.isActivate) {
          validate("Please activate your account !", "/login", req, res);
        } else {
          const userPass = bcrypt.compareSync(password, loginUser.password);

          if (!userPass) {
            validate("Wrong Password", "/login", req, res);
          } else {
            const token = createToken(
              { id: loginUser._id },
              1000 * 60 * 60 * 24 * 365
            );
            req.session.user = loginUser;
            res.cookie("authToken", token);
            validate("Login successful", "/", req, res);
          }
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Logout User
 */
export const logoutUser = (req, res) => {
  delete req.session.user;
  res.clearCookie("authToken");
  validate("Logout successful", "/login", req, res);
};

/**
 * Account activation
 */
export const userAccountActivation = async (req, res) => {
  try {
    const { token } = req.params;
    const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenVerify) {
      validate("Invalid activation link", "/login", req, res);
    } else {
      const activationUser = await User.findOne({ _id: tokenVerify.id });

      if (activationUser.isActivate) {
        validate("Account already activated", "/login", req, res);
      } else {
        await User.findByIdAndUpdate(tokenVerify.id, {
          isActivate: true,
        });
        validate(
          "Account activation successful, Log in now",
          "/login",
          req,
          res
        );
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Forgot password render
 */
export const forgotPassword = (req, res) => {
  res.render("forgot");
};

/**
 * Password reset
 */
export const passwordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne().where("email").equals(email);

    if (!userData) {
      validate("User email does not exists !", "/forgot-password", req, res);
    } else {
      if (!userData.isActivate) {
        validate(
          "Please verify your email first",
          "/forgot-password",
          req,
          res
        );
      } else {
        const token = createToken(
          { id: userData._id },
          1000 * 60 * 60 * 24 * 30
        );
        const updatedData = await User.findOneAndUpdate(
          { email: email },
          { $set: { accessToken: token } }
        );
        const reset_link = `${process.env.APP_URL}:${process.env.PORT}/forgot-password/${token}`;
        passwordResetMail(email, {
          name: userData.name,
          phone: userData.phone,
          link: reset_link,
        });
        validate(
          "Please check your email to reset your password",
          "/forgot-password",
          req,
          res
        );
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Reset forgot password
 */
export const resetForgotPassword = async (req, res) => {
  try {
    const { token } = req.params;

    if (token) {
      const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);

      if (!tokenVerify) {
        validate("Invalid link", "/404", req, res);
      } else {
        const user = await User.findById({ _id: tokenVerify.id });
        if (user) {
          res.render("reset-password", {
            token: token,
          });
        } else {
          validate("Token expired", "/forgot-password", req, res);
        }
      }
    } else {
      validate("User not found", "/forgot-password", req, res);
    }
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Reset forgot password
 */
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { new_password, confirm_password } = req.body;
    if (token) {
      const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
      if (tokenVerify) {
        const user = await User.findById({ _id: tokenVerify.id });
        if (user) {
          if (!new_password || !confirm_password) {
            validate("All fields are required", "/forgot-password", req, res);
          } else {
            if (new_password == confirm_password) {
              await User.findByIdAndUpdate(tokenVerify.id, {
                password: hashPass(confirm_password),
              });
              validate("Password updated successfull", "/login", req, res);
            }
          }
        } else {
          validate("Password not match", "/forgot-password", req, res);
        }
      } else {
        validate("Token expired", "/forgot-password", req, res);
      }
    } else {
      validate("User not found", "/forgot-password", req, res);
    }
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Change password Page
 */
export const changePasswordPage = async (req, res) => {
  res.render("change");
};

/**
 * Change password
 */
export const changePassword = async (req, res) => {
  try {
    const { old_password, new_password, confirm_password } = req.body;

    if (!old_password || !new_password || !confirm_password) {
      validate("All field are required", "/change-password", req, res);
    } else {
      const user = req.session.user;
      if (!user.email) {
        validate("User not found", "/change-password", req, res);
      } else {
        const userPass = bcrypt.compareSync(old_password, user.password);
        if (!userPass) {
          validate("Wrong password", "/change-password", req, res);
        } else {
          if (new_password == confirm_password) {
            await User.findOneAndUpdate(user.id, {
              password: hashPass(confirm_password),
            });
            validate(
              "Password updated successful",
              "/change-password",
              req,
              res
            );
          }
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Profile Photo page
 */
export const profilePhotoPage = (req, res) => {
  res.render("photo");
};

/**
 * Profile Photo Update
 */
export const profilePhoto = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.session.user._id, {
      photo: req.file.filename,
    });
    req.session.user.photo = req.file.filename;
    validate("Profile photo updated", "/photo-update", req, res);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Gallery Photo
 */
export const galleryPage = (req, res) => {
  res.render("gallery");
};

/**
 * Gallery Photo Update
 */
export const galleryPhoto = async (req, res) => {
  try {
    const gall = [];
    req.files.forEach((items) => {
      gall.push(items.filename);
      req.session.user.gallery.push(items.filename);
    });

    await User.findByIdAndUpdate(req.session.user._id, {
      $push: {
        gallery: gall,
      },
    });
    validate("Gallery photo updated successfull", "/gallery-update", req, res);
  } catch (error) {
    validate(error.message, "/gallery-update", req, res);
  }
};

/**
 * Friends page
 */
export const findFriendsPage = async (req, res) => {
  try {
    const friends = await User.find().where("email").ne(req.session.user.email);

    res.render("friends", {
      friends,
    });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Single User Profile page
 */
export const userProfileData = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await User.findById(id);

    res.render("single", {
      profile,
    });
  } catch (error) {
    validate(error.message, "/find-friends", req, res);
  }
};

/**
 * Follow a user
 */
export const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const follow = await User.findByIdAndUpdate(req.session.user._id, {
      $push: {
        following: id,
      },
    });
    await User.findByIdAndUpdate(id, {
      $push: {
        follower: req.session.user._id,
      },
    });
    req.session.user.following.push(id);
    validate("Following successful", "/find-friends", req, res);
  } catch (error) {
    validate(error.message, "/find-friends", req, res);
  }
};

/**
 * Unfollow a user
 */
export const unfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const unfollow = await User.findByIdAndUpdate(req.session.user._id, {
      $pull: {
        following: id,
      },
    });

    await User.findByIdAndUpdate(id, {
      $pull: {
        follower: req.session.user._id,
      },
    });
    let updated_list = req.session.user.following.filter((data) => data != id);
    req.session.user.following = updated_list;
    validate("Unfollow successful", "/find-friends", req, res);
  } catch (error) {
    validate(error.message, "/find-friends", req, res);
  }
};

/**
 * User followers
 */
export const userFollower = async (req, res) => {
  try {
    const { id } = req.params;
    const follower = await User.findById(id).populate("follower");

    res.render("follower", {
      follower: follower,
    });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * User following
 */
export const userFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const following = await User.findById(id).populate("following");

    res.render("following", {
      following: following,
    });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Edit profile
 */
export const editProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await User.findOne({ _id: id });

    res.render("edit", {
      user: userData,
    });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Update profile
 */
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          username: req.body.username,
          phone: req.body.phone,
          age: req.body.age,
          skill: req.body.skill,
          location: req.body.location,
        },
      }
    );
    validate("Updated Successfully", "/edit", req, res);
  } catch (error) {
    console.log(error.message);
  }
};
