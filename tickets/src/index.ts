'use strict'

const PORT = process.env.PORT || 3000
import mongoose  from 'mongoose'
import { app } from './app'
import { natsWrapper } from './nats-warraper'
const start = async () => {
	if(!process.env.JWT_KEY){
		throw new Error('JWT_KEY must be defined')
	}
	try {
		await natsWrapper.connect('ticketing', 'ajhasbjahsbhs', 'http://localhost:4222')
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