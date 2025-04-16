const cors = require("cors");

const express = require('express')
const app = express()
// const prisma = require("prisma")

app.use(cors());
app.use(express.json())
app.use(require('morgan')('dev'))

//=============game routers==================

const gameRouter = require('./src/routes/game')
app.use("/game", gameRouter)

//=============user routes===================

const userRouter = require('./src/routes/user')
app.use("/user", userRouter)

//=============review routes=================

const reviewRouter = require("./src/routes/review")
app.use("/review", reviewRouter)

//=============igdb routes===================

const igdbRoutes = require("./src/routes/igdb");
app.use("/api/igdb", igdbRoutes);




app.listen(3000, () => {
  console.log("server running on port 3000");
});
