'use strict'

import { Router } from 'express'

const api = Router()

api.post('/api/users/signin',  (req, res) => {
	res.send({ok:true, status: 200})
})

export { api as signinRouter }