import express from "express";
import multer from "multer";
import path, { resolve } from "path";
import {
  changePassword,
  changePasswordPage,
  editProfile,
  findFriendsPage,
  followUser,
  forgotPassword,
  galleryPage,
  galleryPhoto,
  loginPage,
  loginUser,
  logoutUser,
  passwordReset,
  profilePage,
  profilePhoto,
  profilePhotoPage,
  registerPage,
  registerUser,
  resetForgotPassword,
  resetPassword,
  unfollowUser,
  updateProfile,
  userAccountActivation,
  userFollower,
  userFollowing,
  userProfileData,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authRedirectMiddleware } from "../middlewares/authRedirectMiddlewares.js";

// router
const router = express.Router();
const __dirname = resolve();

// multer configure
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // profile photo
    if (file.fieldname == "profile") {
      cb(null, path.join(__dirname, "/public/media/user"));
    }

    // gallery photo
    if (file.fieldname == "gallery") {
      cb(null, path.join(__dirname, "/public/media/gallery"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// create multer middleware
const profilePhotoUpdate = multer({
  storage,
}).single("profile");

const galleryPhotoUpdate = multer({
  storage,
}).array("gallery", 5);

// routing
router.get("/", authRedirectMiddleware, profilePage);

// profile photo
router.get("/photo-update", authRedirectMiddleware, profilePhotoPage);
router.post("/photo-update", profilePhotoUpdate, profilePhoto);

// gallery photo
router.get("/gallery-update", authRedirectMiddleware, galleryPage);
router.post("/gallery-update", galleryPhotoUpdate, galleryPhoto);

// register
router.get("/register", authMiddleware, registerPage);
router.post("/register", registerUser);

// login
router.get("/login", authMiddleware, loginPage);
router.post("/login", loginUser);

// update
router.get("/edit/:id", authRedirectMiddleware, editProfile);
router.post("/update/:id", authRedirectMiddleware, updateProfile);

// logout
router.get("/logout", logoutUser);

// mail activation
router.get("/activate/:token", userAccountActivation);

// forgot password
router.get("/forgot-password", authMiddleware, forgotPassword);
router.post("/forgot-password", passwordReset);
router.get("/forgot-password/:token", resetForgotPassword);
router.post("/reset-password/:token", resetPassword);

// change password
router.get("/change-password", authRedirectMiddleware, changePasswordPage);
router.post("/change-password", authRedirectMiddleware, changePassword);

// find friends
router.get("/find-friends", authRedirectMiddleware, findFriendsPage);
router.get("/:id", authRedirectMiddleware, userProfileData);

// follow, unfollow
router.get("/follow/:id", authRedirectMiddleware, followUser);
router.get("/unfollow/:id", authRedirectMiddleware, unfollowUser);

router.get("/followers/:id", authRedirectMiddleware, userFollower);
router.get("/following/:id", authRedirectMiddleware, userFollowing);

// export router
export default router;
