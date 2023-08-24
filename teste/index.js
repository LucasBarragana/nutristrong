const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Conexão com o MongoDB Atlas
mongoose.connect('mongodb+srv://<username>:<password>@cluster-url/testDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definindo o schema e o modelo para usuários
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
  })
);

// Página de login
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Página de cadastro
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

// Manipulador para o formulário de cadastro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({
    username,
    password,
  });

  try {
    await newUser.save();
    res.redirect('/private');
  } catch (error) {
    console.error(error);
    res.send('Erro ao cadastrar o usuário.');
  }
});

// Página privada
app.get('/private', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  res.send('Bem-vindo à página privada!');
});

// Manipulador para o formulário de login
app.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      req.session.user = user;
      res.redirect('/private');
    } else {
      res.send('Credenciais inválidas.');
    }
  } catch (error) {
    console.error(error);
    res.send('Erro ao fazer login.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
