import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ecochallenge from "./api/eco-challenge.route.js";
import session from "express-session";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import passport from "passport";
import UserDAO from "./dao/user.dao.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("req.session", req.session);
  if (req.headers.origin === "http://localhost:3000") {
    console.log("ORIGIN X", req.headers);
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Auth-Token");
  }
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.ECOCHALLENGE_SESSION_HASH,
    resave: false,
    saveUninitialized: false,
  })
);

const LS = LocalStrategy.Strategy;

const strategy = new LS(
  {
    usernameField: "username",
  },
  async function (username, password, done) {
    let json, user;
    const response = await UserDAO.getUserByUsername(username)
      .then((response) => {
        json = JSON.stringify(response);
        user = JSON.parse(json);
      })
      .catch((e) => {
        console.log("err");
        return done(e);
      });

    if (user["_id"] === undefined) {
      console.log("wrong user");
      return done(null, false, { message: "Incorrect username" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      console.log("wrong pword");
      return done(null, false, { message: "Incorrect password" });
    }

    console.log("loggedin!!\n");
    return done(null, user);
  }
);

passport.serializeUser((user, done) => {
  console.log("*** serializeUser called, user: ");
  console.log(user);
  done(null, { _id: user._id });
});

passport.deserializeUser(async (id, done) => {
  let j, user_json;
  console.log(id["_id"]);
  const response = await UserDAO.getUserById(id["_id"])
    .then((response) => {
      j = JSON.stringify(response);
      user_json = JSON.parse(j);
      console.log("*** Deserialize user, user:");
      console.log("--------------");
    })
    .catch((e) => {
      console.log("err");
      return done(e);
    });
  return done(null, user_json);
});

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

ecochallenge.route("/login").post(
  function (req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    var userInfo = {
      username: req.user.name,
    };
    console.log("logged in", req.user);
    res.send(userInfo);
  }
);

ecochallenge.route("/get-user").get((req, res, next) => {
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

app.use("/api/eco-challenge", ecochallenge);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
