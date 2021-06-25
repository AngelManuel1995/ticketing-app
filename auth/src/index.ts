import express from 'express'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { errorHandler } from './middlewares/error-hanlder'
import { NotFoundError } from './errors/not-found-error'
const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.all('*', () => {
	throw new NotFoundError()
})
app.use(errorHandler)

app.listen(PORT, () => {
	console.log('v9')
	console.log(`Auth services is running on port ${PORT}`)
})