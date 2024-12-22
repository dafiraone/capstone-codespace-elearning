const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, 'codespace', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

const TOKENS = []

const logout = async (req, res) => {
  const token = req.headers.authorization

  if (!token) {
    
  }

  if (!TOKENS.includes(token)) {
    TOKENS.push(token)
    res.status(200).json({ message: 'User logged out successfully' });
  } else {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { register, login, logout };
