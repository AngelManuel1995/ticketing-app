'use strict'

import { Router, Request, Response } from 'express'
import { SIGNUP_VALIDATORS } from '../validators/validators'
import { User } from '../models/user'
import { BadRequestError, validateRequest } from '@magtickets/common'
import jwt from 'jsonwebtoken'

const api = Router()

api.post('/api/users/signup', SIGNUP_VALIDATORS, validateRequest, async (req: Request, res: Response) => {
	const { email, password } = req.body
	const existingUser = await User.findOne({email})
	if(existingUser){
		throw new BadRequestError('Email in use')
	}
	const user = User.build({email, password})
	try {
		await user.save()
		const userJwt = jwt.sign({
			id: user.id,
			email: user.email
		}, process.env.JWT_KEY!)
		req.session = {
			userJwt
		}
		res.status(201).send(user)
	} catch (error) {
		throw new BadRequestError(error.message)		
	}
})

export { api as signupRouter }