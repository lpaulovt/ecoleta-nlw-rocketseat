const express = require('express');
const server = express();

const db = require("./database/db.js")

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server.use(express.static('public'))


server.get('/', function(req, res){
    return res.render('index.html')
})

server.get('/create-point', function(req, res){
    return res.render('create-point.html')
})

server.post('/save-point', (req, res) => {
    return res.send("ok")
})

server.get('/search', function(req, res){
    //Pegar dados

    db.all(`SELECT * FROM places`, function(err, rows){
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