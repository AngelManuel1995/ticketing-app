'use strict'

import { Router } from 'express'
import { currentUser } from '@magtickets/common'

const api = Router()

api.get('/api/users/currentuser', currentUser, (req, res) => {
	res.send({currentUser: req.currentUser || null})
})

export { api as currentUserRouter }