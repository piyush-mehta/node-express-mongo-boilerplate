const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://admin:admin@ds133004.mlab.com:33004/star-wars-quotes', (err, database) => {
    // .... start the server only if database get connected
    if(err) {
        return console.log(err);
    }
    else {
        db = database;
        // start listening to requests on port: 3000
        app.listen(3000, () => {
            console.log('listening on port 3000');
        });
    }
});

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');



/** 
 * type of request - GET
 * 'path' is the route where request is to be listened
 * 'callback' tells the server what to do when path is matched in a request
 *  app.get(path, callback);
 * 
*/

// write 'Hello World' on matching route path
// app.get('/', (req, res) => {
//     res.send('Hello World !!');
// });

// send a html file on matching route path
app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, results) => {
        if(err) {
            return console.log(err);
        }
        else {
            res.render('index.ejs', {quotes: results});
        }
    });
});

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if(err) {
            return console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});


app.put('/quotes', (req, res) => {
    db.collection('quotes')
    .findOneAndUpdate({firstname: 'Piyush'}, {
      $set: {
        firstname: req.body.firstname,
        quote: req.body.quote
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    });
});
