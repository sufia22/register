import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import ejs from "ejs";
import session from "express-session";
import ejsLayouts from "express-ejs-layouts";
import { monogoDBConnection } from "./configs/db.js";
import { localsMiddlewares } from "./middlewares/localsMiddlewares.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";

// environment variables
dotenv.config();
const PORT = process.env.PORT || 4000;

// express init
const app = express();

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// setup session
app.use(
  session({
    secret: "I love MERN",
    saveUninitialized: true,
    resave: false,
  })
);

app.use(localsMiddlewares);

// static folder
app.use(express.static("public"));

// setup ejs layouts
app.set("view engine", "ejs");
app.set("layout", "layouts/app");
app.use(ejsLayouts);

// routes
app.use("/", userRoute);

// server listen
app.listen(PORT, () => {
  monogoDBConnection();
  console.log(`Server is running on port ${PORT}`.bgGreen.black);
});
