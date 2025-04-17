const express = require("express")
const router = express.Router()
const prisma = require('../../prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenAuth = require('../middleware/TokenAuth')

//============Routers to create=====================

// Login Funtion ========================================
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password ) {
        return res.status(400).json({
            error: "missing email or password"
        })
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) {
        return res.status(404).json({
            error: "no user found :("
        })
    }

    const passwordCheck = await bcrypt.compare( password, user.password)
    if(!passwordCheck) {
        return res.status(401).json({
            error: "wrong password silly"
        })
    }
    
    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT)
    res.status(200).json({
        successMessage: "you gots a user :)",
        token: token
    })
})

// creating account ========================================

router.post('/register', async (req, res) => {
    const { email, password, username, fName, lName } = req.body; 
    if( !email || !password || !username ) {
        return res.status(400).json({
            error: "missing email, username or password"
        })
    }
    const existingEmail = await prisma.user.findUnique({ where: { email }})

    console.log("email conflict =>", existingEmail)

    if(existingEmail){
        return res.status(400).json({
            error: "account with this email already exists"
        })
    }
    const existingUsername = await prisma.user.findUnique({ where: { username }})
    if (existingUsername) {
        return res.status(400).json({
            error: "username is already taken"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
            fName,
            lName
        }
    })

    const token = jwt.sign({ id: newUser.id, isAdmin: false }, process.env.JWT)

    res.status(200).json({
        successMessage: "New User Created :)",
        token: token
    })
})

// get user info by id ==================================

router.get("/info", tokenAuth, async (req, res, next) => {
    const id = req.userId

    const allInfo = await prisma.user.findUnique({ where: { id }})
    const refinedInfo = {
        id: allInfo.id,
        email: allInfo.email,
        username: allInfo.username,
        avatar: allInfo.avatar,
        isAdmin: allInfo.isAdmin,
        fName: allInfo.fName,
        lName: allInfo.lName,
        createdAt: allInfo.createdAt
        //posts?
        //communities?
        //comments?
    }

    res.status(200).json({
        successMessage: "here ya go silly",
        user: refinedInfo
    })
})

// get all users==========ADMIN ONLY=====================

router.get("/all", tokenAuth, async (req, res) => {
    const isAdmin = req.isAdmin

    if(!isAdmin){
        return res.status(401).json({
            error: "No Admin Privilege"
        })
    }

    const allUsers = await prisma.user.findMany()

    res.status(200).json({
        successMessage: "all active users",
        users: allUsers
    })
})

// delete a user=========ADMIN OR EXISTIING USER========

router.delete("/delete/:id", tokenAuth, async (req, res) => {
    const isAdmin = req.isAdmin
    const userId = req.userId
    const id = +req.params.id

    const userExists = await prisma.user.findUnique({ where: { id }})
    if(!userExists){
        return res.status(404).json({
            error: "No Existing User To Delete"
        })
    }
    if( isAdmin || userId === id ){
        const user = await prisma.user.delete({ where: { id }})
        return res.status(200).json({
            successMessage: "userDeleted",
            user: user
        })
    } else {
        return res.status(401).json({
            error: "Not Auth"
        })
    }
})

// update a user=====================================

router.put("/update/:id", tokenAuth, async (req, res) => {
    const isAdmin = req.isAdmin
    const userId = req.userId
    const id = +req.params.id

    const userExists = await prisma.user.findUnique({ where: { id }})
    if(!userExists){
        return res.status(404).json({
            error: "No Existing User to Update"
        })
    }
    const { email, username, password, avatar, fName, lName } = req.body
    let hashedPassword = undefined
    if(password){
        hashedPassword = await bcrypt.hash(password, 10)
    }

    if( isAdmin || userId === id){
        const updatedUser = await prisma.user.update({
            where: {id},
            data: {
                email,
                username,
                password: hashedPassword || userExists.password,
                avatar,
                fName,
                lName
            }
        })
        
        res.status(200).json({
            successMessage: "User Update",
            oldData: userExists,
            updatedData: updatedUser
        })
    } else {
        return res.status(403).json({
            error: "Not Auth"
        })
    }
})

// admin update ========================================

router.patch("/upgrade/:id", tokenAuth,  async (req, res) => {
    const id = +req.params.id;
    const isAdmin = req.isAdmin

    const userExists = await prisma.user.findUnique({ where: { id }})
    if(!userExists){
        return res.status(404).json({
            error: "No User To Upgrade"
        })
    }
    if(id === 1) {
        return res.status(403).json({
            error: "Cannot downgrade Owner"
        })
    }
    if(!isAdmin){
        return res.status(403).json({
            error: "Missing Admin Privilege"
        })
    }
    const upgradedUser = await prisma.user.update({
        where: {id},
        data: {isAdmin: !userExists.isAdmin}
    })

    if(upgradedUser.isAdmin){
        res.status(200).json({
            successMessage: "User Successfully Upgraded To Admin"
        })
    } else {
        return res.status(200).json({
            successMessage: "User Successfuly Downgraded",
            user: upgradedUser
        })
    }
})



module.exports = router