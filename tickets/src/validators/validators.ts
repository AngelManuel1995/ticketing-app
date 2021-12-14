import { body } from 'express-validator'

export const TICKET_CREATION = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title must be provided')
    ,
    body('price')
        .isFloat({gt: 0})
        .withMessage('Price must be greater than 0')
]