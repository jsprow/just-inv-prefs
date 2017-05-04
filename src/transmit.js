const app = require('http').createServer(handler),
    io = require('socket.io')(app),
    fs = require('fs'),
    http = require('http'),
    guid = '{9C5E8465-A0AC-40CB-8F70-884A16A22235}',
    mobile = '2693529412'


var prefs = [],
    url = 'http://client.texnrewards.net/gateway/contactmanager.asp?user_guid=' + guid + '&mobile=' + mobile + '&custom1='


app.listen(3030)

function handler(req, res) {
    fs.readFile(__dirname + '/index.js',
        function (err, data) {
            if (err) {
                res.writeHead(500)
                return res.end('Error loading index.js')
            }
            console.log('connected')
            res.writeHead(200)
            res.end(data)
        })
}

io.on('connection', function (socket) {
    socket.emit('ready', { hello: 'world' })
    socket.on('send-prefs', function (data) {
        prefs = data._prefs

        var makes = [],
            models = [],
            years = [],
            message

        for (var i = 0; i < prefs.length; i++) {
            makes.push(prefs[i].make)
            models.push(prefs[i].model)
            years.push(prefs[i].year)
        }
        
        message = makes + ',' + models + ',' + years
        http.get(url + message, (res) => {
            const { statusCode } = res
            const contentType = res.headers['content-type']

            let error
            if (statusCode !== 200) {
                error = new Error(`Request Failed.\n` +
                    `Status Code: ${statusCode}`)
            } 
            if (error) {
                console.error(error.message)
                // consume response data to free up memory
                res.resume()
                return
            }

            res.setEncoding('utf8')
            let rawData = ''
            res.on('data', (chunk) => { rawData += chunk })
            res.on('end', () => {
                try {
                    console.log(rawData)
                } catch (e) {
                    console.error(e.message)
                }
            })
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`)
        })
    })
})