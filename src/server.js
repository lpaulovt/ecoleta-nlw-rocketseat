const express = require('express');
const server = express();

const db = require("./database/db.js")

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server.use(express.static('public'))

server.use(express.urlencoded({ extended: true}))

server.get('/', function(req, res){
    return res.render('index.html')
})

server.get('/create-point', function(req, res){
    return res.render('create-point.html')
})

server.post('/save-point', (req, res) => {
    //console.log(req.body)

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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    
    function afterInsertData (err) {
        if (err) {
            console.log(err)
            return res.render('create-point.html', {falha: true})
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)
        
        return res.render('create-point.html', {saved: true})
    }

    db.run(query, values, afterInsertData)

    
})

server.get('/search', function(req, res){
    //Pegar dados
    const search = req.query.search

    if(search == ""){
        return res.render('search-results.html', {total: 0})
    }

    db.all(`SELECT * FROM places WHERE  city LIKE '%${search}%'`, function(err, rows){
        if (err) {
            return console.log(err)
        }

        const total = rows.length;

        return res.render('search-results.html', { places: rows, total})
    })
})


server.listen(3000, (req, res) => {
    console.log('Server is running...')
});