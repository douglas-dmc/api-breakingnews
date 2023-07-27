import { createService, findAllService } from '../services/news.service.js'

const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body

        if (!title || !text| !banner){
            res.status(400).send({ message: "Submite all fields for registration"})
        }

        await createService({
            title,
            text,
            banner,
            user: { _id: "64bef696fd6bcccf204271e0" }
        })

        res.sendStatus(201)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const findAll = async (req, res) => {
    const news = await findAllService()

    if (news.length === 0){
        return res.status(400).send({ message: "There are no registered news" })
    }
    res.send(news)
}

export { create, findAll }