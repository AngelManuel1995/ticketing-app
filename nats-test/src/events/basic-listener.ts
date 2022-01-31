import { Message, Stan } from 'node-nats-streaming'
import { Subjects } from './subjects'

interface Event {
	subject: Subjects;
	data: any
}
export abstract class Listener<T extends Event> {
	
	abstract subject: T['subject']
	abstract queueGroupName: string
	abstract onMessage(data:T['data'], message:Message): void
	private client: Stan
	protected ackWait = 5 * 1000
	
	constructor(client: Stan){
		this.client = client
	}

	subscriptionOptions () {
		return this.client
			.subscriptionOptions()
			.setDeliverAllAvailable() //Para que envie todos los eventos que se generaron
			.setManualAckMode(true) //Para obligarnos a dar una respuesta al publisher para que sepa que los procesos que dispara salen bien
			.setAckWait(this.ackWait)
			.setDurableName(this.queueGroupName) // Para que se envien todos solo los eventos que fallaron a la hora de la entrega
	}

	listen () {
		const subscription = this.client.subscribe(
			this.subject, //Topico por el cual se van a subscribir
			this.queueGroupName, //Para que no lo haga multiples veces y solo lo envíe a una instancia 
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