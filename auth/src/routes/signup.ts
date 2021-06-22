'use strict'

import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { DatabaseConnectionError } from '../errors/database-connection-error'
import { RequestValidationError } from '../errors/request-validation-error'
import { SIGNUP_VALIDATORS } from '../validators/validators'

const api = Router()

api.post('/api/users/signup', SIGNUP_VALIDATORS, (req: Request, res: Response) => {
	const errors = validationResult(req)
	if(!errors.isEmpty()){
		throw new RequestValidationError(errors.array())
	}
	throw new DatabaseConnectionError()
	res.send({ok:true, status: 200})
})

export { api as signupRouter }