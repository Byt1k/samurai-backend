const http = require('http')
const fs = require('fs')

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => {
            if(error) reject(error)
            else resolve(data)
        })
    })
}

let counter = 0

const server = http.createServer( async (req, res) => {
    if (req.url === '/favicon.ico') {
        // res.writeHead(200, {'Content-Type': 'iamge/x-icon'})

        const data = await readFile('static/favicon.ico')
        try {
            res.end(data)
        } catch (e) {
            res.statusCode = 404
            res.end('File not found!')
        }

        return;
    }

    switch (req.url) {
        case '/':
        case '/courses':
            res.write('COURSES')
            break
        case '/students':
            res.write('ALL STUDENTS')
            break
        case '/favicon.ico':
            res.write('hahaha')
            break
        default:
            res.write('404 Not Found')
    }

    counter++
    res.write('\n Counter: ' + counter)
    res.end()
})

server.listen(5000)