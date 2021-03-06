const express = require('express')
const { ObjectId } = require('mongodb')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'fateCharBuilder'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req,res)=>{
    db.collection('characters').find().toArray()
    .then(data => {
        res.render(`index.ejs`, { info : data })
    })
    .catch(error=>console.log(error))
        
})

app.post('/createCharacter', (req, res)=>{
    db.collection('characters').insertOne({name: req.body.charName,
    race: req.body.charRace, age: req.body.charAge})
    .then(()=> {
        console.log('added character')
        res.redirect('/')
    })
    .catch(error => console.log(error))
})

app.delete('/deleteCharacter', (req,res)=>{
    db.collection('characters').deleteOne({_id: ObjectId(req.body.ids.toString()) })
    .then(result => {
        console.log('deleted character')
        res.json('deleted character')
    })
    .catch(error => console.log(error))
})

app.put('/updateCharacter', (req, res)=>{
    console.log(req.body)
    db.collection('characters').updateOne({_id: ObjectId(req.body.ids.toString())},
    {$set:{
        name: req.body.uName,
        race: req.body.uRace,
        age: req.body.uAge
    }})
    .then(result=>{
        console.log("updated")
        res.json('updated')
    })
    .catch(error=>console.log(error))
})


app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})