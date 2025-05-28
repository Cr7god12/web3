const Pais = require('../model/paisModel');

const validarTexto = texto => /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/.test(texto);

exports.getAll = (req, res) => {
  Pais.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { nombre, capital, continente } = req.body;
  if (![nombre, capital, continente].every(validarTexto)) {
    return res.status(400).json({ error: "Datos inválidos" });
  }
  Pais.create({ nombre, capital, continente }, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: "País agregado" });
  });
};

exports.update = (req, res) => {
  const { nombre, capital, continente } = req.body;
  const { id } = req.params;
  if (![nombre, capital, continente].every(validarTexto)) {
    return res.status(400).json({ error: "Datos inválidos" });
  }
  Pais.update(id, { nombre, capital, continente }, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "País actualizado" });
  });
};

exports.delete = (req, res) => {
  Pais.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "País eliminado" });
  });
};
