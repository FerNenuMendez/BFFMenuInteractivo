import { app } from './app/app.js'
import { PORT } from './config/config.js'
import { connect } from './database/dataBase.js'

await connect()
app.listen(PORT)