const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const db = require('./utils/database');
const hendleError = require('./middlewares/error.middleware');
const initModels = require('./models/initModels');
const { UserRoutes, ProductsRoutes, RolesRoutes, CategoriesRoutes, AuthRoutes, OrdersRoutes } = require('./routes');

const app = express();


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Servir archivos estáticos desde /uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

db.authenticate()
    .then(() => console.log('Authenticate complete'))
    .catch(error => console.log(error));

db.sync({ force: false })
    .then(() => console.log('Synchronized database'))
    .catch(error => console.log(error));

initModels();

app.get('/', (req, res) => {
    console.log('Bienvenido al server');
});

app.use('/api/v1', AuthRoutes);
app.use('/api/v1', UserRoutes);
app.use('/api/v1', ProductsRoutes);
app.use('/api/v1', RolesRoutes);
app.use('/api/v1', CategoriesRoutes);
app.use('/api/v1', OrdersRoutes);

app.use(hendleError);

module.exports = app;