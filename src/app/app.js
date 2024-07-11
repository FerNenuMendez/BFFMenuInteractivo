import express from 'express'
import cors from 'cors';
import { apiRouter } from '../routes/api.router.js'
import { cookies } from '../middlewares/cookies.js'

export const app = express()

const corsOptions = {
    origin: '*', // 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
    optionsSuccessStatus: 200,
};
app.use(cookies)
app.use(cors(corsOptions));
app.use('/api', apiRouter)
app.get('/', (req, res) => {
    res.send('Api en Vercel funcionando OK')
})