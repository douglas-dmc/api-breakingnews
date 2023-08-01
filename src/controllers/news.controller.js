import {
    countNews,
    createService,
    findAllService,
    findByIdService,
    topNewsService,
    searchByTitleService,
    byUserService,
    updateService,
    eraseService,
    likeNewsService,
    deleteLikeNewsService,
    addCommentService,
    deleteCommentService,
} from "../services/news.service.js"

const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body

        if (!title || !text || !banner) {
            return res
                .status(400)
                .send({ message: "Submite all fields for registration" })
        }

        await createService({
            title,
            text,
            banner,
            user: { _id: req.userId },
        })

        res.sendStatus(201)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const findAll = async (req, res) => {
    try {
        let { limit, offset } = req.query

        limit = Number(limit)
        offset = Number(offset)

        if (!limit) {
            limit = 5
        }
        if (!offset) {
            offset = 0
        }

        const news = await findAllService(offset, limit)
        const total = await countNews()
        const currentUrl = req.base

        const next = offset - limit
        const nextUrl =
            next < total
                ? `${currentUrl}?limit=${limit}&offset=${offset}`
                : null
        const previous = offset - limit < 0 ? null : offset - limit
        const previousUrl =
            previous != null
                ? `${currentUrl}?limit=${limit}&offset=${previous}`
                : null

        if (news.length === 0) {
            return res
                .status(400)
                .send({ message: "There are no registered news" })
        }
        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: news.map((Item) => ({
                id: Item._id,
                title: Item.title,
                text: Item.text,
                banner: Item.banner,
                likes: Item.likes,
                comments: Item.comments,
                name: Item.user.name,
                userName: Item.user.username,
                userAvatar: Item.user.avatar,
            })),
        })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const topNews = async (req, res) => {
    try {
        const news = await topNewsService()

        if (!news) {
            return res
                .status(400)
                .send({ message: "There is no registered port" })
        }

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                userName: news.user.username,
                userAvatar: news.user.avatar,
            },
        })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const findById = async (req, res) => {
    try {
        const { id } = req.params
        const news = await findByIdService(id)

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                userName: news.user.username,
                userAvatar: news.user.avatar,
            },
        })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query
        const news = await searchByTitleService(title)

        if (news.length === 0) {
            return res
                .status(400)
                .send({ message: "There are no posts with this title" })
        }

        return res.send({
            results: news.map((Item) => ({
                id: Item._id,
                title: Item.title,
                text: Item.text,
                banner: Item.banner,
                likes: Item.likes,
                comments: Item.comments,
                name: Item.user.name,
                userName: Item.user.username,
                userAvatar: Item.user.avatar,
            })),
        })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const byUser = async (req, res) => {
    try {
        const id = req.userId
        const news = await byUserService(id)

        return res.send({
            results: news.map((Item) => ({
                id: Item._id,
                title: Item.title,
                text: Item.text,
                banner: Item.banner,
                likes: Item.likes,
                comments: Item.comments,
                name: Item.user.name,
                userName: Item.user.username,
                userAvatar: Item.user.avatar,
            })),
        })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const update = async (req, res) => {
    try {
        const { title, text, banner } = req.body
        const { id } = req.params

        if (!title && !text && !banner) {
            res.status(400).send({
                message: "Submit at least one field to update the post!",
            })
        }

        const news = await findByIdService(id)

        if (String(news.user._id) !== req.userId) {
            return res
                .status(400)
                .send({ message: "You don't update this post!" })
        }

        await updateService(id, title, text, banner)

        return res.send({ message: "Post successfully updated!" })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const erase = async (req, res) => {
    try {
        const { id } = req.params
        const news = await findByIdService(id)

        if (String(news.user._id) !== req.userId) {
            return res
                .status(400)
                .send({ message: "You don't delete this post!" })
        }

        await eraseService(id)

        return res.send({ message: "Post successfully deleted!" })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const likeNews = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.userId

        const newsliked = await likeNewsService(id, userId)

        if (!newsliked) {
            await deleteLikeNewsService(id, userId)
            return res
                .status(200)
                .send({ message: "Like successfully removed!" })
        }

        res.send({ message: "Like done successfully!" })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const addComment = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.userId
        const { comment } = req.body

        if (!comment) {
            return res
                .status(400)
                .send({ message: "Write a message to comment!" })
        }

        await addCommentService(id, comment, userId)

        res.send({ message: "Comment successfully completed!" })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const deleteComment = async (req, res) => {
    try {
        const { id, idComment } = req.params
        const userId = req.userId

        const commentDeleted = await deleteCommentService(id, idComment, userId)

        const commentFinder = commentDeleted.comments.find(
            (comment) => comment.idComment === idComment
        )

        if (!commentFinder) {
            return res.status(400).send({ message: "Comment not found!" })
        }

        if (commentFinder.userId !== userId) {
            return res
                .status(400)
                .send({ message: "You can't delete this comment!" })
        }

        res.send({ message: "Comment successfully removed!" })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

export {
    create,
    findAll,
    topNews,
    findById,
    searchByTitle,
    byUser,
    update,
    erase,
    likeNews,
    addComment,
    deleteComment,
}