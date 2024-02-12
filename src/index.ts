import express from 'express'
import dotenv from 'dotenv'
import { MongoConnection } from './database/mongo-connect'
import { productRoutes } from './domains/products/routes/productRoutes'


dotenv.config()
MongoConnection.initialize()

const app = express()
app.use(express.json())
app.use(productRoutes)

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))