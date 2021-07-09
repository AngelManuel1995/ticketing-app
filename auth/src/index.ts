'use strict'

import express from 'express'
import mongoose  from 'mongoose'

import 'express-async-errors'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { errorHandler } from './middlewares/error-hanlder'
import { NotFoundError } from './errors/not-found-error'
const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.all('*', async (req, res) => {
	throw new NotFoundError()
})
app.use(errorHandler)

const start = async () => {
	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',  {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
		console.log('Connected to mongoDb')
	} catch (error) {
		console.log(error)
	}
	app.listen(PORT, () => {
		console.log('v9')
		console.log(`Auth service is running on port ${PORT}`)
	})
}

start()