'use strict'

import { Router, Request, Response } from 'express'
import { validateRequest, BadRequestError } from '@magtickets/common'
import { SIGNIN_VALIDATORS } from '../validators/validators'
import { User } from '../models/user'
import { Password } from '../services/password'
import jwt from 'jsonwebtoken'
const api = Router()

api.post('/api/users/signin', SIGNIN_VALIDATORS, validateRequest, async (req: Request, res: Response) => {
	const { email, password } = req.body
	const existingUser = await User.findOne({email})
	if(!existingUser){
		throw new BadRequestError('Invalid credentials')
	}
	const passwordMatch = await Password.compare(existingUser.password, password)
	if(!passwordMatch){
		throw new BadRequestError('Invalid credentials')
	}
	const userJwt = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!)
	req.session = { userJwt }
	res.status(200).send(existingUser)
})

export { api as signinRouter }