const User = require('../models/userModel');

exports.getUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  User.getById(id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  User.create(newUser, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuario creado', id: result.insertId });
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  User.update(id, updatedUser, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuario actualizado' });
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.delete(id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuario eliminado' });
  });
};
