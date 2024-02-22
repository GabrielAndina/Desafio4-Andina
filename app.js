const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('home', { products: getAllProducts() });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: getAllProducts() });
});


io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('addProduct', (product) => {

    io.emit('productAdded', product);
  });

  socket.on('deleteProduct', (productId) => {

    io.emit('productDeleted', productId);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});


function getAllProducts() {

  return [
    { id: 1, title: 'Camiseta de Rugby', price: 29.99 },
    { id: 2, title: 'Shorts de Rugby', price: 19.99 },
    { id: 3, title: 'Balón de Rugby', price: 39.99 },
  ];
}
