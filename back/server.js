const http = require('http');

const server = http.createServer((req, res) => {
    res.end("Voila la réponse du serveur !")
})

server.listen(process.env.PORT || 3000)

test 1 2