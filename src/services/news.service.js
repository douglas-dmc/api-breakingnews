import newsRepositories from "../repositories/post.repositories.js"

async function createNewsService({ title, banner, text }, userId) {
    if (!title || !banner || !text)
        throw new Error("Submit all fields for registration")

    const { id } = await newsRepositories.createNewsRepository(
        title,
        banner,
        text,
        userId
    )

    return {
        message: "Post created successfully!",
        post: { id, title, banner, text },
    }
}

async function findAllNewsService(limit, offset, currentUrl) {
    limit = Number(limit)
    offset = Number(offset)

    if (!limit) {
        limit = 5
    }

    if (!offset) {
        offset = 0
    }

    const posts = await newsRepositories.findAllNewsService(offset, limit)

    const total = await newsRepositories.countNews()

    const next = offset + limit
    const nextUrl =
        next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

    const previous = offset - limit < 0 ? null : offset - limit
    const previousUrl =
        previous != null
            ? `${currentUrl}?limit=${limit}&offset=${previous}`
            : null

    news.shift()

    return {
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,

        results: news.map((post) => ({
            id: post._id,
            title: post.title,
            banner: post.banner,
            text: post.text,
            likes: post.likes,
            comments: post.comments,
            name: post.user.name,
            username: post.user.username,
            avatar: post.user.avatar,
        })),
    }
}

async function topNewsService() {
    const news = await newsRepositories.topNewsRepository()

    if (!news) throw new Error("There is no registered post")

    return {
        news: {
            id: news._id,
            title: news.title,
            banner: news.banner,
            text: news.text,
            likes: news.likes,
            comments: news.comments,
            name: news.user.name,
            username: news.user.username,
            avatar: news.user.avatar,
        },
    }
}

async function searchNewsService(title) {
    const foundNews = await newsRepositories.searchNewsRepository(title)

    if (foundNews.length === 0)
        throw new Error("There are no posts with this title")

    return {
        foundNews: foundNews.map((post) => ({
            id: post._id,
            title: post.title,
            banner: post.banner,
            text: post.text,
            likes: post.likes,
            comments: post.comments,
            name: post.user.name,
            username: post.user.username,
            avatar: post.user.avatar,
        })),
    }
}

async function findNewsByIdService(id) {
    const news = await newsRepositories.findNewsByIdRepository(id)

    if (!news) throw new Error("Post not found")

    return {
        id: news._id,
        title: news.title,
        banner: news.banner,
        text: news.text,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        username: news.user.username,
        avatar: news.user.avatar,
    }
}

async function findNewsByUserIdService(id) {
    const news = await newsRepositories.findNewsByUserIdRepository(id)

    return {
        newsByUser: news.map((post) => ({
            id: post._id,
            title: post.title,
            banner: post.banner,
            text: post.text,
            likes: post.likes,
            comments: post.comments,
            name: post.user.name,
            username: post.user.username,
            avatar: post.user.avatar,
        })),
    }
}

async function updateNewsService(id, title, banner, text, userId) {
    if (!title && !banner && !text)
        throw new Error("Submit at least one field to update the post")

    const news = await newsRepositories.findNewsByIdRepository(id)

    if (!news) throw new Error("Post not found")

    if (news.user._id != userId) throw new Error("You didn't create this post")

    await newsRepositories.updateNewsRepository(id, title, banner, text)
}

async function deleteNewsService(id, userId) {
    const news = await newsRepository.findNewsByIdService(id)

    if (!news) throw new Error("Post not found")

    if (news.user._id != userId) throw new Error("You didn't create this post")

    await newsRepositories.deleteNewsRepository(id)
}

async function likeNewsService(id, userId) {
    const postLiked = await newsRepositories.likesRepository(id, userId)

    if (postLiked.lastErrorObject.n === 0) {
        await newsRepositories.likesDeleteRepository(id, userId)
        return { message: "Like successfully removed" }
    }

    return { message: "Like done successfully" }
}

async function commentNewsService(postId, message, userId) {
    if (!message) throw new Error("Write a message to comment")

    const post = await newsRepositories.findPostByIdRepository(postId)

    if (!post) throw new Error("Post not found")

    await newsRepositories.commentsRepository(postId, message, userId)
}

async function commentDeleteNewsService(postId, userId, idComment) {
    const post = await newsRepositories.findNewsByIdRepository(postId)

    if (!post) throw new Error("Post not found")

    await newsRepositories.commentsDeleteRepository(postId, userId, idComment)
}

export default {
    createNewsService,
    findAllNewsService,
    topNewsService,
    searchNewsService,
    findNewsByIdService,
    findNewsByUserIdService,
    updateNewsService,
    deleteNewsService,
    likeNewsService,
    commentNewsService,
    commentDeleteNewsService,
}
