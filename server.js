var express = require('express')
    , cors = require('cors')
    , bodyParser = require('body-parser')
    , PB_WEBAPI = require('./PB_WEBAPI')
    , app = express();

app.use(cors());
app.use(bodyParser.json());

// Use environment defined port or 3000
var port = process.env.PORT || 3009;

// Create our Express router
var router = express.Router();

// todo write descr
Object.keys(PB_WEBAPI).forEach(function (name) {
    router.post('/' + name, function(req, res) {
        PB_WEBAPI[name](req.body).then(function (resp) {
            res.json(resp.data);
        }, function (resp) {
            res.status(400);
            res.json(resp.data);
        });
    });
});


// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);

console.log('Insert beer on port ' + port);