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
var index = 0;

// definir ruta tipo get y su acción
app.get('/', (request, response) => {
    console.log('alguien entró a la ruta inicial');
    response.sendFile(__dirname + '/public/home.html');
});

app.get('/api/car', (request, response) => {
    response.send(cars);
})
app.post('/api/car', (request, response) => {
    let product = request.body;
    index += 1;
    product.id = index;
    cars.push(product);
    response.send({
        product:product,
        message: 'ok'
    });
});

app.delete('/api/car', (request, response) => {
    let number = request.body.id;

    cars.forEach((c)=>{
        if(number == c.id){
            cars.splice(c, 1);
        }
    });

    response.send({
        message: 'deleted',
    });

});

app.put('/api/car', (request, response) => {
    let product = JSON.parse(request.body.product);

    cars.forEach((c)=>{
        if(product.id == c.id){
            c.brand = product.brand;
            c.rims = product.rims;
            c.color = product.color;
    
        }
    });

    response.send({
        message: 'modificated',
    });
});


app.listen(4000, () => {
    console.log('listening');
});