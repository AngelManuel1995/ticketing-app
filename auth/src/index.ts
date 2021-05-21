import express from 'express'

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.get('/api/users/currentuser',  (req, res) => {
	res.send({ok:true, status: 200})
})

app.listen(PORT, () => {
	console.log('v9')
	console.log(`Auth services is running on port ${PORT}`)
})