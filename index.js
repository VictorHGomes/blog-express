const express = require ('express')
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/database.js')
const categoriesController = require('./categories/categoriesController.js')
const articlesController = require('./articles/articlesController.js')
//VIEW ENGINE
app.set('view engine', 'ejs');
//ARQUIVOS ESTÁTICOS
app.use(express.static('public'))

//BODY PARSER
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//DATABASE
connection.authenticate().then(() => {
    console.log('Conexão com o banco de dados feita com sucesso!')
}).catch((error) => {
    console.log(error);

})


app.use('/', categoriesController)
app.use('/', articlesController)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(8080, () => {
    console.log('O servidor está rodando');
})