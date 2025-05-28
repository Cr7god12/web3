const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const paisRoutes = require('./routes/paisRoutes');
const ciudadRoutes = require('./routes/ciudadRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/paises', paisRoutes);
app.use('/api/ciudades', ciudadRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
