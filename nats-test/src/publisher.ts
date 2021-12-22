'use strict'

import nats from 'node-nats-streaming'

console.clear()

const stan = nats.connect('ticketing', 'abc', {
	url:"http://localhost:4222"
})

stan.on('connect', () => {
	console.log('Publiser connected to NATS')
	const data = JSON.stringify({
		id: '12345',
		title: 'This is a message',
		price: 20
	})
	stan.publish('ticket:created', data, () => {
		console.log('Event published')
	})
})