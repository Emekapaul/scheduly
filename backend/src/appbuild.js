import express from "express";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./AuthStrategy/local-strategy.js";
import cors from "cors";
import router from "./routes/main.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? "https://scheduly-frontend.onrender.com"
          : "http://localhost:3000",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
      ],
      exposedHeaders: ["set-cookie"],
    })
  );

  app.use(express.json());
  app.use(
    session({
      secret: process.env.SESSIONSECRET || "scheduly",
      saveUninitialized: false,
      resave: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 14 * 24 * 60 * 60, // = 14 days
        autoRemove: "native",
      }),
      cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000, // = 14 days
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        httpOnly: true,
        path: "/",
        // Remove domain setting to let the browser handle it automatically
      },
    })
  );

  app.use((req, res, next) => {
    console.log("Session ID:", req.sessionID);
    console.log("Session:", req.session);
    console.log("Cookie header:", req.headers.cookie);
    next();
  });

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(router);

  return app;
}
