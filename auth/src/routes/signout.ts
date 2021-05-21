'use strict'

import { Router } from 'express'

const api = Router()

api.get('/api/users/signout',  (req, res) => {
	res.send({ok:true, status: 200})
})

export { api as signoutRouter }