import { TicketUpdatedEvent } from './ticket-updated-event'
import { Listener } from './base-listener'
import { Subjects } from './subjects'
import { Message } from 'node-nats-streaming'

export class TicketUpdatedListenet extends Listener <TicketUpdatedEvent> {
	
	subject: Subjects.TicketUpdated = Subjects.TicketUpdated
	queueGroupName: string = 'payments-service'

	onMessage(data: TicketUpdatedEvent['data'] , message: Message): void {
		message.ack()
	}

}