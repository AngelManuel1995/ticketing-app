'use strict'

import { Router } from 'express'

const api = Router()

api.post('/api/users/signout',  (req, res) => {
	req.session = null
	res.send({})
})

export { api as signoutRouter }