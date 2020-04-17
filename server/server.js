let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let path = require('path');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/listAccounts',
    (req, res) => {
        let menuPath = path.join(__dirname, '/performanceData.json');
        let menuPathFile = fs.readFileSync(menuPath);
        res.setHeader('Content-Type','application/json');
        setTimeout(()=>{
            res.write(menuPathFile)
            res.end()
        },3000000)
    })


app.listen('3003');