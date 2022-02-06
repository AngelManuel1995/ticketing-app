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
		await natsWrapper.connect('ticketing', 'ajhasbjahsbhs', 'http://nats-srv:4222')
		natsWrapper.client.on('close', () => {
			console.log('NATS connection close')
			process.exit()
		})
		process.on('SIGINT', () => natsWrapper.client.close())
		process.on('SIGTERM', () => natsWrapper.client.close())

		await mongoose.connect('mongodb://auth:password@tickets-mongo-srv:27017/auth',  {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
		console.log('Connected to mongoDb')
		app.listen(PORT, () => {
			console.log('v9')
			console.log(`Ticketing service is running on port ${PORT}`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()