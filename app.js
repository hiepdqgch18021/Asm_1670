const express = require('express')
const app = express()
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
const url = 'mongodb+srv://hiepdqgch18021:hiep1234@cluster0.jks3x.mongodb.net/Appdev1670'

app.get('/', async(req, res) => {
    res.render('index');

})

const PORT = process.env.PORT || 5010
app.listen(PORT)
console.log("Server is running! " + PORT)