const express = require('express')
const server = express()

// concect to db.js
const db = require('./database/db')

//config public dir
server.use(express.static("public"))

//turn enable req.body use
server.use(express.urlencoded({ extended: true }))

//config template engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})
//config routes

//initial page
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um titulo" })
})

server.get("/create-point", (req, res) => {

    //req.query
    console.log(req.query)

    return res.render("create-point.html")
})

server.get("/search-results", (req, res) => {

    const search = req.query.search

    if (search == "") {

        db.all(`SELECT * FROM places`, function (err, rows) {
            if (err) {
                return console.log(err)
            }

            const total = rows.length
            //show to html page, the data.
            return res.render("search-results.html", { places: rows, total })
        })

    }
    else {
        //search by city name
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
            if (err) {
                return console.log(err)
            }
            console.log("Aqui estão seus registros: ")
            console.log(rows)

            const total = rows.length
            //show to html page, the data.
            return res.render("search-results.html", { places: rows, total })
        })
    }


})

server.post('/savepoint', (req, res) => {

    //req.body, body of form
    const body = req.body
    //insert data in db
    const query = `
         INSERT INTO places (
             image,
             name,
             address,
             address2,
             state,
             city,
             items
         ) VALUES (?,?,?,?,?,?,?);

        
     `
    const values = [
        body.image,
        body.name,
        body.address,
        body.address2,
        body.state,
        body.city,
        body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send('Erro no cadastro, verifique no console')
        }
        console.log('cadastrado com sucesso')
        console.log(this)

        return res.render('create-point.html', { saved: true })
    }

    db.run(query, values, afterInsertData)


})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

//start server
server.listen(3000)