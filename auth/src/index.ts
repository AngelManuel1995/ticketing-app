import express from 'express'

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.get('/',  (req, res) => {
	res.send({ok:true, status: 200})
})

app.listen(PORT, () => {
	console.log(`Auth services is running on port ${PORT}`)
})