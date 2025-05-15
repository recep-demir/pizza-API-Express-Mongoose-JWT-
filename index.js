"use strict"

const express = require('express')
const app = express()


// envVariables to process.env:
require('dotenv').config()
const PORT = process.env?.PORT || 8000



// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

// Middlewares:

// Accept JSON:
app.use(express.json())

// Logger:
app.use(require('./src/middlewares/logger'))

// Auhentication:
app.use(require('./src/middlewares/authentication'))

// findSearchSortPage / res.getModelList:
app.use(require('./src/middlewares/queryHandler'))






// Routes:

// routes/index.js:
app.use('/', require('./src/routes/'))

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PIZZA API',
        docs: {
            swagger: "/documents/swagger",
            redoc: "/documents/redoc",
            json: "/documents/json",
        },
        user: req.user,
    })
})

// Static Route
app.use('/images', express.static('./uploads'));

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.