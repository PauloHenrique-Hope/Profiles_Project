const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mysql = require('mysql')


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({
    extended: true,
}))

app.use(express.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})


app.get('/editProfile/:id', (req,res) => {
    const id = req.params.id

    const sql = `SELECT * FROM profiles WHERE id = ${id}`

    conn.query(sql, (err, data) =>{
        if(err){
            console.log(err)
        }

        const profile = data[0]

        res.render('editProfile', {profile})
    })

    
})

app.get('/profiles', (req, res) =>{
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const occupation = req.body.occupation

    const sql = `SELECT * FROM profiles`

    conn.query(sql, (err, data) =>{
        if(err){
            console.log(err)
        }

        const profiles = data

        res.render('profiles', {profiles})
    })
})

app.post('/create', (req, res) =>{
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const occupation = req.body.occupation

    const sql = `INSERT INTO profiles (first_name, last_name, occupation) VALUES ('${first_name}', '${last_name}', '${occupation}')` 
    
    conn.query(sql, (err) =>{
        if(err){
            console.log(err)
        }

        res.redirect('/')
    })
})

app.get('/create', (req, res) =>{
    res.render('create')
})

app.get('/create', (req, res) => {
    res.send('create')
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'profiles_project',
    port: 3307,
})

conn.connect(function (err) {
    if(err){
        console.log(err)
    }

    console.log("Application working!")
    app.listen(3000)
})

