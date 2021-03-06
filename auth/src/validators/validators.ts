import { body } from 'express-validator'

export const SIGNUP_VALIDATORS = [ 
	body('email')
		.trim()
		.isEmail()
		.withMessage('Email must be valid'),
	body('password')
		.trim()
		.isLength({min: 4, max: 20})
		.withMessage('Password must be between 4 and 20 characters')
]

export const SIGNIN_VALIDATORS = [
	body('email')
		.trim()
		.isEmail()
		.withMessage('Email must be valid'),
	body('password')
		.trim()
		.notEmpty()
		.withMessage('You must supply a password')	
]