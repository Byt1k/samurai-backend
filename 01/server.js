const http = require('http')
const fs = require('fs')

let counter = 0

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'iamge/x-icon'})

        const filePath = 'favicon.ico'
        fs.readFile(filePath, (error, data) => {
            if(error){
                res.statusCode = 404;
                res.end('Resourse not found!')
            }
            else{
                res.end(data)
            }
        })

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