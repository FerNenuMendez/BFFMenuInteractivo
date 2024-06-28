import { Router } from "express";
import { getController } from "../controllers/user.controller.js";

export const userRouter = Router()

userRouter.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://menu-iota-ten.vercel.app/api/clientes/');
        if (response.data && response.data.status === 'success') {
            res.json(response.data.payload);
        } else {
            res.status(500).json({ error: 'Unexpected response format' });
        }
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});
