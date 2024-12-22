const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db/connection');

const { register, login, logout } = require('./controllers/authController');
const { getAllItems, getItemById, createItem, updateItem, deleteItem } = require('./controllers/itemController');
const { verifyToken, isAdmin } = require('./middlewares/authMiddleware');

const app = express();
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Elearning' });
});

app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);

app.get('/data', verifyToken, getAllItems);
app.get('/data/:id', verifyToken, getItemById);
app.post('/data', verifyToken, isAdmin, createItem);
app.put('/data/:id', verifyToken, isAdmin, updateItem);
app.delete('/data/:id', verifyToken, isAdmin, deleteItem);

const PORT = 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error('Unable to connect to the database:', error));
