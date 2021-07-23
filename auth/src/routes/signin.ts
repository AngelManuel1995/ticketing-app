'use strict'

import { Router, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import { SIGNIN_VALIDATORS } from '../validators/validators'
const api = Router()

api.post('/api/users/signin', SIGNIN_VALIDATORS, async (req: Request, res: Response) => {
	const errors = validationResult(req)
	if(!errors.isEmpty()){
		throw new RequestValidationError(errors.array())
	}
	res.send({ok:true, status: 200})
})

export { api as signinRouter }