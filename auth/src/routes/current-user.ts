'use strict'

import jwt from 'jsonwebtoken'
import { Router } from 'express'

const api = Router()

api.get('/api/users/currentuser',  (req, res) => {
	if(!req.session?.jwt) {
		return res.send({currentUser: null})
	}
	try {
		const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)
		res.send({currentUser: payload})
	} catch (error) {
		res.send({currentUser: null})
	}
})

export { api as currentUserRouter }