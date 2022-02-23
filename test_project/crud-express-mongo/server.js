// server.js
//console.log('May Node be with you')

const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const connString = process.env.MONGODB_CONNSTRING;


const connectionString = "mongodb+srv://teemo:teemo123@cluster0.o7o5b.mongodb.net/project-2?retryWrites=true&w=majority"


 //"mongodb+srv://teemo:teemo123@cluster0.l5nex.mongodb.net/project-1?retryWrites=true&w=majority"

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('project-2')
    const gradesCollection = db.collection('grades')
    
    // Middlewares
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))
    


    app.get('/', (req, res) => {
        db.collection('grades').find().toArray()
          .then(results => {
            res.render('index.ejs', { grades: results })
        //    console.log(results)
          })
          .catch(error => console.error(error))
        
    })

    app.post('/grades', (req, res) => {
      gradesCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })


    app.put('/grades', (req, res) => {
      gradesCollection.findOneAndUpdate(
        { name: 'Rob' },
        {
          $set: {
            name: req.body.name,
            grade: req.body.grade
          }
        },
        {
          upsert: true
        }
      )
        .then(result => res.json('Success'))
        .catch(error => console.error(error))
    })

    
    app.delete('/grades', (req, res) => {
        gradesCollection.deleteOne(
          { name: req.body.name }
        )
          .then(result => {
            if (result.deletedCount === 0) {
              return res.json('No grade to delete')
            }
            res.json('Deleted class_average\'s grade')
          })
          .catch(error => console.error(error))
    })
  



    //app.get(endpoint, callback)

    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')

    })

    app.post('/grades', (req, res) => {
      console.log(req.body)
    })


    app.listen(3000, function() {
        console.log('listening on 3000')
    })


})

