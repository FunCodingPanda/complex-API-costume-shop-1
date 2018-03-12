const model = require('../models/costumes')

create = (req, res, next) => {
  const costume = model.create(req.body)

  if (costume.errors) {
    return next({
      status: costume.status,
      message: costume.message,
      errors: costume.errors
    })
  }

  res.status(201).json({ costume })
}

getAll = (req, res, next) => {
  const costumes = model.getAll(req.query.limit)

console.log(costumes);
console.log(costumes.error);

  if (costumes.error) {
    return next({
      status: costumes.status,
      message: costumes.message,
      error: costumes.error
    })
  }

  res.status(200).json({ costumes })
}

getById = (req, res, next) => {
  const id = req.params.id
  const costume = model.getById(id)

  if (costume.error) {
    return next({
      status: costume.status,
      message: costume.message,
      error: costume.error
    })
  }

  res.status(200).json({ costume })
}

update = (req, res, next) => {

}

deleteById = (req, res, next) => {

}

module.exports = { create, getAll, getById, update, deleteById }
