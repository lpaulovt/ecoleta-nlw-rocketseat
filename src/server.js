const express = require('express');

const server = express();

server.listen(3000, function(req, res){
    console.log('Server is running...')
});