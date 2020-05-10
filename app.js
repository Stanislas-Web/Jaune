const express = require('express')
const mysql = require('mysql')
const app = express()
const bodyParser = require('body-parser')
const port = 4000;


// database config
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Stanislas',
  database: 'jauneCongo',
  password: 'Stanislas2020@',
});


//Moteur de template
app.set('view engine','ejs')

//Middleware
app.use('/public',express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
 //Routes


connection.connect((erreur) => {
  if (erreur) {
    throw erreur;
  }
  console.log('La connexion à la base de données est établie');
});



app.get('/produits', (request, response) => {
	connection.query('select * from products', (erreur, resultat) => {
		if (erreur) throw erreur;
		console.log(resultat);
		return response.render('index', { produits: resultat });
	});
});

app.get('/produits/:id', (request, response) => {
	connection.query(`select * from products where id=${request.params.id}`, (erreur, resultat) => {
		if (erreur) throw erreur;
		return response.render('detail', { produits: resultat[0] });
    });
});



    

app.listen(port,()=>{
    console.log(`le serveur tourne sur le port ${port}`);
    
})