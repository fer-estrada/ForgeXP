const express = require('express')
const router = express.Router()

// get all favorited from a user
router.get('/:userId/favorites', async (req, res, next) => {
    try {
        const userId =+ req.params.userId
        if (!userId) return res.json({ error: 'User not found / User ID invalid' })

        const response = await prisma.favorites.findMany({ where: {userId} })

        if (favorites.length === 0) return res.json({ message: 'User has no favorited posts'})

        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

// favorite a post
router.post('/:userId/favorites', async (req, res, next) => {
    try {
        const userId =+ req.params.userId
        if (!userId) return res.status(400).json({ error: 'User not found / User ID invalid' })

        const { postId } =+ req.body
        if (!postId) return res.json({ error: 'Post not found / Post ID invalid' })

        const response = await prisma.favorites.create({ data: userId, postId })

        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
})

// 'un-favorite' a post
router.delete('/:userId/favorites/:id', async (req, res, next) => {
    try {
        const userId =+ req.params.userId
        if (!userId) return res.json({ error: 'User not found / User ID invalid' })

        const id =+ req.params.id
        if (!id) return res.json({ error: 'Post not found / Post ID invalid' })

        const response = await prisma.favorites.delete({ where: {userId, id} })

        res.status(200).json({ message: 'Post succesfully un-favorited!' })
    } catch (error) {
        next(error)
    }
})

module.exports = router