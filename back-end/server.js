
const express = require('express')
const cors = require("cors");
const app = express()
// const prisma = require("prisma")

app.use(cors());
app.use(express.json())
app.use(require('morgan')('dev'))
app.use('/images', express.static('images'))

//=============user routes===================

const userRouter = require('./src/routes/user')
app.use("/user", userRouter)

//=============favorite routes=================

const favoritesRouter = require('./src/routes/favorites')
app.use('/user', favoritesRouter)

//=============posts routes=================

const postRouter = require('./src/routes/post')
app.use('/post', postRouter)

//=============game-community routes=================

const gameCommunityRouter = require('./src/routes/gameCommunity')
app.use('/gamecommunity', gameCommunityRouter)

//=============comments routes=================

const commentsRouter = require('./src/routes/comments')
app.use('/post', commentsRouter)

app.listen(3000, () => {
  console.log("server running on port 3000");
});
