import News from "../models/News.js"

const createService = (body) => News.create(body)

const findAllService = (offset, limit) =>
    News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user")

const countNews = () => News.countDocuments()

const topNewsService = () => News.findOne().sort({ _id: -1 }).populate("user")

const findByIdService = (id) => News.findById(id).populate("user")

const searchByTitleService = (title) =>
    News.find({
        title: { $regex: `${title || ""}`, $options: "i" },
    })
        .sort({ _id: -1 })
        .populate("user")

const byUserService = (id) =>
    News.find({ user: id }).sort({ _id: -1 }).populate("user")

const updateService = (id, title, text, banner) =>
    News.findOneAndUpdate(
        { _id: id },
        { title, text, banner },
        { rawResult: true }
    )

const eraseService = (id) => News.findByIdAndDelete({ _id: id })

const likeNewsService = (id, userId) =>
    News.findOneAndUpdate(
        { _id: id, "likes.userId": { $nin: [userId] } },
        { $push: { likes: { userId, createdAt: new Date() } } }
    )

const deleteLikeNewsService = (id, userId) =>
    News.findOneAndUpdate({ _id: id }, { $pull: { likes: { userId } } })

const addCommentService = (id, comment, userId) => {
    const idComment = Math.floor(Date.now() * Math.random()).toString(36)

    return News.findOneAndUpdate(
        { _id: id },
        {
            $push: {
                comments: { idComment, userId, comment, createdAt: new Date() },
            },
        }
    )
}

const deleteCommentService = (id, idComment, userId) =>
    News.findOneAndUpdate(
        { _id: id },
        { $pull: { comments: { idComment, userId } } }
    )

export {
    createService,
    findAllService,
    countNews,
    topNewsService,
    findByIdService,
    searchByTitleService,
    byUserService,
    updateService,
    eraseService,
    likeNewsService,
    deleteLikeNewsService,
    addCommentService,
    deleteCommentService,
}
