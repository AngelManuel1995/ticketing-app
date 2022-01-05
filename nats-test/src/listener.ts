import nats, { Message, Stan } from 'node-nats-streaming'
import { randomBytes } from 'crypto'

console.clear()

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
	url: 'http://localhost:4222'
})

stan.on('connect', () => {
	console.log('Listener connected to NATS')

	stan.on('close', () => {
		console.log('NATS connection close')
		process.exit()
	}) // To handler a disconnect event

	const options = stan
		.subscriptionOptions()
		.setManualAckMode(true) //Para obligarnos a dar una respuesta al publisher para que sepa que los procesos que dispara salen bien
		.setDeliverAllAvailable() //Para que envie todos los eventos que se generaron
		.setDurableName('accounting-service') // Para que se envien todos solo los eventos que fallaron a la hora de la entrega
	
	const subscription = stan.subscribe(
		'ticket:created', //Topico por el cual se van a subscribir
		'orders-service-queue-group', //Para que no lo haga multiples veces y solo lo envíe a una instancia 
		options
	);

	subscription.on('message', (msg: Message) => {
		const data = msg.getData()
		if(typeof data === 'string') {
			console.log(`Received event #${msg.getSequence()}, with data: ${JSON.parse(data)['price']}`)
		}
		msg.ack() //Para dar respuesta al publisher 
	})
})

process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())

abstract class Listener {
	
	abstract subject: string
	abstract queueGroupName: string
	abstract onMessage(data:any, message:Message): void
	private client: Stan
	protected ackWait = 5 * 1000
	
	constructor(client: Stan){
		this.client = client
	}

	subscriptionOptions () {
		return this.client
			.subscriptionOptions()
			.setDeliverAllAvailable()
			.setManualAckMode(true)
			.setAckWait(this.ackWait)
			.setDurableName(this.queueGroupName)
	}

	listen () {
		const subscription = stan.subscribe(
			this.subject,
			this.queueGroupName,
			this.subscriptionOptions()
		)

		subscription.on('message', (message: Message) => {
			console.log(`Message received: ${this.subject} / ${this.queueGroupName}`)
			const parsedDate = this.parseMessage(message)
			this.onMessage(parsedDate, message)
		})
	}

	parseMessage (message: Message) {
		const data = message.getData()
		return typeof data === 'string'
			? JSON.parse(data)
			: JSON.parse(data.toString('utf8'))
	}

}