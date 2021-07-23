'use strict'

import { Router } from 'express'
import { currentUser } from '../middlewares/current-user'
import { requireAuth } from '../middlewares/require-auth'

const api = Router()

api.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
	res.send({currentUser: req.currentUser || null})
})

export { api as currentUserRouter }