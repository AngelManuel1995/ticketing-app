'use strict'

import nats from 'node-nats-streaming'
import { TicketCreatedPublisher } from './events/ticket-created-publisher'

console.clear()

const stan = nats.connect('ticketing', 'abc', {
	url:"http://localhost:4222"
})

stan.on('connect', async () => {
	console.log('Publiser connected to NATS')
	const publisher = new TicketCreatedPublisher(stan)

	try {
		await publisher.publish({
			id:'1s18xa9',
			title: 'This is the first event',
			price: Number ((Math.random() * 10).toFixed(0))
		})
	} catch (err) {
		console.log(err)
	}

})