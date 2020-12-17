const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const cors = require('cors')


module.exports = () => {
    const app = express()
    
    app.use(bodyParser.json({extend: true}))
    app.use(cors())
    
    consign()
        .include('controllers')
        .into(app)
    return app
}