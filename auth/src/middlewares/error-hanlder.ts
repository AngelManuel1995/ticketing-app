import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/custom-error'

export const errorHandler = (
	err: Error, 
	req: Request, 
	res: Response, 
	next: NextFunction) => {
	console.log('Someting went wrong. Upss!!!')

	if (err instanceof CustomError) {
		console.log('Error validation', err)
		return res.status(err.statusCode).send({errors: err.serializeErrors()})
	}
	
	res.status(400).send({
		errors: [
			{ message: 'Something went wrong!' }
		]
	})
}