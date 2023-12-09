// run npm install to install dependencies

const express = require('express')
const app = express()

const routes = require('./routes/blog.js')

require('dotenv').config()

const mongodbConnect = require('./database-connect')

const port = process.env.PORT || "3000"
const databaseUrl = process.env.DATABASE

mongodbConnect(databaseUrl);

app.use(express.json())
app.use('/api', routes)

app.get('/', (req, res) => { res.send(`<h1>out</h1>`) })

app.listen(port, () => {
    console.log('server running at port ' + port);
});


