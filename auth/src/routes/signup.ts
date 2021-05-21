'use strict'

import { Router } from 'express'

const api = Router()

api.get('/api/users/signup',  (req, res) => {
	res.send({ok:true, status: 200})
})

export { api as signupRouter }