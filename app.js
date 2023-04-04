const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


const app = express();
const port = 3000;
const url =  'mongodb://localhost:27017';
const dbName = 'node_crud';

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology: true}, (err, client) =>{

    if (err) return console.log(err);
    db = client.db(dbName);
    console.log('Connected MongoDB:${url}');
    console.log('Database:${dbName}');
});

//--------------------------- create operation -----------------------

app.post('/create' , (req, res) =>{
    const{ name,email} = req.body;
    const collection = db.collection('users');
    collection.insertOne({ name, email },(err, result) =>{
        if (err) return console.log(err);
        console.log('USer created');
        res.redirect('/');
        
    });
});

//--------------------------- read operation -----------------------
app.get('/' , (req, res) =>{
    const collection = db.collection('users');
    collection.find({}).toArray((err, docs) =>{
        if (err) return console.log(err);
        res.render('index.ejs', { users:docs});
    });
});


//--------------------------- update operation -----------------------

app.put('/update' , (req , res) =>{
    const { name,email } = req.body;
    const collection = db.collection('users');
    collection.findOneAndUpdate(
        { name },
        { $set : {email,},},
        {upsert : true,},
        (err, result) =>{
            if (err) return res.send(err);
            console.log('User updated');
            res.redirect('/');
        } 
    );

});

//--------------------------- update operation -----------------------
app.delete('delete',)