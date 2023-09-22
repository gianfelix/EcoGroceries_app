require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const apiRouter = express.Router();
const PORT = process.env.PORT || 8000;
const app = express();
app.use(
  cors({
    origin: [
      process.env.WHITELISTED_DOMAIN &&
      process.env.WHITELISTED_DOMAIN.split(","),
    ],
  })
  );

  app.use(express.json());
  const db = require('./models')
  // db.sequelize.sync({alter: true})
  
const {authRouter, profileRouter, rajaongkirRouter, addressRouter} = require('./router');
const path = require("path");

app.use('/api/auth', apiRouter,authRouter)
app.use('/api/profile', apiRouter,profileRouter)
app.use('/api/rajaongkir', apiRouter,rajaongkirRouter)
app.use('/api/address', apiRouter,addressRouter)


//#region API ROUTES
app.use("/api/public", express.static(path.resolve(__dirname, "../public")))

// ===========================
// NOTE : Add your routes here
// apiRouter.use('/auth', authRouter)
// app.get("/api", (req, res) => {
//   res.send(`Hello, this is my API`);
// });

// app.get("/api/greetings", (req, res, next) => {
//   res.status(200).json({
//     message: "Hello, Student !",
//   });
// });

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
