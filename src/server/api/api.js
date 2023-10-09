const express = require('express')
const cors = require('cors')
const app = express()
const orders = require('./routes/orders.js')
const users = require('./routes/users.js')
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/orders', orders)
app.use('/api/users', users)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
