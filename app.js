const express = require('express')
const app = express()
const port = 3000
const routerUser = require('./routes/routesUser')


app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/", routerUser)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))