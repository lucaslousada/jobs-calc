const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

// template engine
server.set('view engine', 'ejs')
// changes the location of the views folder
server.set('views', path.join(__dirname, 'views'))
// enable statics files
server.use(express.static("public"))
// use req.body
server.use(express.urlencoded({ extended: true }))

server.use(routes)

server.listen(3000, () => console.log("rodando"))
