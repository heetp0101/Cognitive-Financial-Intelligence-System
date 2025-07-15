const express = require('express')
const users = require('./')
const app = express()
const dbConnect = require('./dbConnect')
const cors = require('cors');
const port = 3001
const userRoute = require('./client/routes/usersRoute')


app.use(express.json())
app.use(cors());
app.use('/api/users', userRoute)
 

app.listen(port, () => console.log(`Nodejs server started at port no: ${port}!`))
