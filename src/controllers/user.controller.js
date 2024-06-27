import logger from "../middlewares/logger.js"

const url_post = 'https://menu-iota-ten.vercel.app/api/clientes/'

export async function postController(req, res, next) {
    try {
        const response = await axios.post(url_post, req.body);
        console.log(url_post)
        logger.info(response)
        res.json(response.data);
    } catch (error) {
        logger.error(error)
        next(error)
    }
}