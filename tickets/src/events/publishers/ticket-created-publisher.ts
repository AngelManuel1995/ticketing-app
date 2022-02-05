import { Publisher, Subjects, TicketCreatedEvent } from '@magtickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	subject: Subjects.TicketCreated = Subjects.TicketCreated
}