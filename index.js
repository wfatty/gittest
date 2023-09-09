const express = require('express')

const app = express()
const path = require('path')
const rawdata = require('./data.json')


app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))



app.get('/', (req, res) => {
    res.render('home')

})
app.get('/test', (req, res) => {
    const { user_id, firstName } = req.query

    res.json({ user_id, firstName })

})

app.post('/test', (req, res) => {
    const { username } = req.body
    res.send(`This is your username ${username}`)

})

app.get('/r/:subredit', (req, res) => {

    const { subredit } = req.params

    const data = rawdata[subredit]

    data ? res.render('subredit', { ...data }) : res.render('notfound', { subredit })


})


app.get('/rand', (req, res) => {
    let num = Math.floor(Math.random() * 10) + 1
    res.render('random', { rand: num })

})


app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Montey', 'Stephanie', 'Winston'
    ]
    res.render('cats', { cats })

})

app.listen(2001, () => {
    console.log('Server is runing on port 2001')
})