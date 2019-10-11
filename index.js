// importar handlebars :)
var exphbs  = require('express-handlebars');
 

// importar módulo
const express = require('express');
// importar body parser
var bodyParser = require('body-parser');
// importar file system
var fs = require('fs');

// instanciar app
const app = express();
//lineas de handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// configuración body parser para poder usar variables post en el body
app.use(bodyParser.urlencoded({ extended: true }));


// definir una carpeta como pública
app.use(express.static('public'));

var cars = [];

// definir ruta tipo get y su acción
app.get('/', (request, response) => {
    console.log('alguien entró a la ruta inicial');
    response.sendFile(__dirname + '/public/home.html');
});

app.get('/api/car', (request, response) => {
    response.send(cars);
})
app.post('/api/car', (request, response) => {
    console.log(request.body);
    cars.push(request.body);
    response.send({
        message: 'ok',
    });
});

app.delete('/api/car', (request, response) => {
    console.log(request.body);
    var index = request.body.indexToDelete;
    cars.splice(parseInt(index),1);
    response.send({
        message: 'deleted',
    });
});

app.put('/api/car', (request, response) => {
 var elementToEdit
    response.send({
        message: 'modificated',
    });
});


app.listen(5000, () => {
    console.log('listening');
});