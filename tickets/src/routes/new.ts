'use strict'

import { requireAuth, validateRequest } from '@magtickets/common'
import express, { Request, Response } from 'express'
import { TICKET_CREATION } from '../validators/validators'
import { Ticket } from '../models/ticket'
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher'
import { natsWrapper } from '../nats-wrapper'
const router = express.Router()

router.post('/api/tickets', requireAuth, TICKET_CREATION, validateRequest, async (req: Request, res: Response) => {
	const { price, title } = req.body
	const ticket = Ticket.build({
		price,
		title,
		userId: req.currentUser!.id
	})
	await ticket.save()
	new TicketCreatedPublisher(natsWrapper.client).publish({
		id: ticket.id,
		price: ticket.price,
		title: ticket.title,
		userId: ticket.userId
	})
	res.status(201).send({})
})

export {
    router as createTicketRouter
}