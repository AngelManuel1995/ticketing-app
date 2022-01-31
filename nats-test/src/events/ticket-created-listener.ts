import {Message} from 'node-nats-streaming'
import { Listener } from './basic-listener'

export class TicketCreatedListener extends Listener{
	subject: string = 'ticket:created'
	queueGroupName: string = 'payments-service';

	onMessage(data: any, message: Message): void {
		console.log('Event data! ', data)
		message.ack()
	}
}