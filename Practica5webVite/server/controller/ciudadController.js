const Ciudad = require('../model/ciudadModel');

const validarTexto = texto => /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/.test(texto);
const validarNumero = num => /^[0-9]+$/.test(num);

exports.getAll = (req, res) => {
  Ciudad.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { nombre, poblacion, region, id_pais } = req.body;
  if (!validarTexto(nombre) || !validarTexto(region) || !validarNumero(poblacion)) {
    return res.status(400).json({ error: "Datos inválidos" });
  }
  Ciudad.create({ nombre, poblacion, region, id_pais }, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: "Ciudad agregada" });
  });
};

exports.update = (req, res) => {
  const { nombre, poblacion, region, id_pais } = req.body;
  if (!validarTexto(nombre) || !validarTexto(region) || !validarNumero(poblacion)) {
    return res.status(400).json({ error: "Datos inválidos" });
  }
  Ciudad.update(req.params.id, { nombre, poblacion, region, id_pais }, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Ciudad actualizada" });
  });
};

exports.delete = (req, res) => {
  Ciudad.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Ciudad eliminada" });
  });
};
