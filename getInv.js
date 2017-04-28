const https = require('https'),
    app = require('express')(),
    server = require('https').Server(app),
    io = require('socket.io')(server),
    fs = require('fs'),
    url = 'https://api.edmunds.com/api/vehicle/v2/makes?view=basic&fmt=json&api_key=casyfxrg9qqdsn5cfq6gg7f7',
    file = 'src/data/carList.json'

var assets = [],
    cars = []

fs.readFile('src/data/carList.json', (err, data) => {
    if (err) throw err
    contents = JSON.parse(data)
    for (let i = 0; i < contents.makes.length; i++) {
        var make = contents.makes[i].name,
            models = contents.makes[i].models

        for (let i = 0; i < models.length; i++) {
            var _model = models[i].name,
                years = models[i].years,
                _years = []

            for (let i = 0; i < years.length; i++) {
                var _year = years[i].year
                _years.push(_year)

            }
            cars.push({ "make": make, "model": _model, "years": _years })

        }
    }
    fs.writeFile('src/data/carListParsed.json', JSON.stringify(cars), (err) => {
        if (err) throw err
    })
})

// https.get(url, (res) => {
//     console.log('statusCode:', res.statusCode);
//     console.log('headers:', res.headers);

//     let rawData = ''
//     res.on('data', (chunk) => { rawData += chunk; })
//     res.on('end', () => {
//         try {
//             fs.writeFile(file, rawData, (err) => {
//                 if (err) throw err
//                 console.log('file written')
//             })
//         } catch (err) {
//             console.error(err.message);
//         }
//     })
// }).on('error', (err) => {
//     console.error(err);
// })