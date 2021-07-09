'use strict'

import { Router, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import { SIGNUP_VALIDATORS } from '../validators/validators'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'

const api = Router()

api.post('/api/users/signup', SIGNUP_VALIDATORS, async (req: Request, res: Response) => {
	console.log('Entró')
	const errors = validationResult(req)
	if(!errors.isEmpty()){
		throw new RequestValidationError(errors.array())
	}
	const { email, password } = req.body
	console.log(req.body, email, password)
	const existingUser = await User.findOne({email})
	if(existingUser){
		console.log('Email in use')
		throw new BadRequestError('Email in use')
	}
	const user = User.build({email, password})
	try {
		await user.save()
		res.status(201).send(user)
	} catch (error) {
		console.log(error)
		throw new BadRequestError(error.message)		
	}
})

export { api as signupRouter }