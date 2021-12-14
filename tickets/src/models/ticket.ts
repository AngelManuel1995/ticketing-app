'use strict'

import { Schema, Model, Document, model } from 'mongoose'

export interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

export interface TicketDoc extends Document {
    title: string;
    price: number;
    userId: string;
    createdAt: Date
}

export interface TicketModel extends Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc
}

const TicketSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be at least 0, got {VALUE}'],
    },
    userId: {
        type: String,
        required: true,
        trim: true
    }
})

TicketSchema.statics.build = function (attrs: TicketAttrs) {
    return new Ticket(attrs)
}

const Ticket = model<TicketDoc, TicketModel>('Ticket', TicketSchema)

export { Ticket }