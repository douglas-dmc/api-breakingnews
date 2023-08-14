import newsService from "../services/post.service.js"

async function createNewsController(req, res) {
    const { title, banner, text } = req.body
    const userId = req.userId

    try {
        const post = await newsService.createNewsService(
            { title, banner, text },
            userId
        )
        return res.status(201).send(post)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

async function findAllNewsController(req, res) {
    const { limit, offset } = req.query
    const currentUrl = req.baseUrl

    try {
        const posts = await newsService.findAllNewsService(
            limit,
            offset,
            currentUrl
        )
        return res.send(posts)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

async function topNewsController(req, res) {
    try {
        const post = await newsService.topNewsService()
        return res.send(post)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

async function searchNewsController(req, res) {
    const { title } = req.query

    try {
        const foundPosts = await newsService.searchNewsService(title)

        return res.send(foundPosts)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

async function findNewsByIdController(req, res) {
    const { id } = req.params

    try {
        const post = await newsService.findNewsByIdService(id)
        return res.send(post)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

async function findNewsByUserIdController(req, res) {
    const id = req.userId
    try {
        const posts = await newsService.findNewsByUserIdService(id)
        return res.send(posts)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

async function updateNewsController(req, res) {
    const { title, banner, text } = req.body
    const { id } = req.params
    const userId = req.userId

    try {
        await newsService.updatePostService(id, title, banner, text, userId)

        return res.send({ message: "Post successfully updated!" })
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

async function deleteNewsController(req, res) {
    const { id } = req.params
    const userId = req.userId

    try {
        await newsService.deleteNewsService(id, userId)
        return res.send({ message: "Post deleted successfully" })
    } catch (err) {
        return res.status(500).send(e.message)
    }
}

async function likeNewsController(req, res) {
    const { id } = req.params
    const userId = req.userId

    try {
        const response = await newsService.likeNewsService(id, userId)

        return res.send(response)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

async function commentNewsController(req, res) {
    const { id: postId } = req.params
    const { message } = req.body
    const userId = req.userId

    try {
        await newsService.commentNewsService(postId, message, userId)

        return res.send({
            message: "Comment successfully completed!",
        })
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

async function commentDeleteNewsController(req, res) {
    const { id: postId, idComment } = req.params
    const userId = req.userId

    try {
        await newsService.commentDeleteNewsService(postId, userId, idComment)

        return res.send({ message: "Comment successfully removed" })
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

export default {
    createNewsController,
    findAllNewsController,
    topNewsController,
    searchNewsController,
    findNewsByIdController,
    findNewsByUserIdController,
    updateNewsController,
    deleteNewsController,
    likeNewsController,
    commentNewsController,
    commentDeleteNewsController,
}
