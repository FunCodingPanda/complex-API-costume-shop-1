const fs = require('fs')
const path = require('path')
const costumeShop = '../../costume-shop/'
const uuid = require('uuid/v4')

create = (body) => {
  const error = []
  let response

  // check for errors when body
  if (body.name === undefined || body.price === undefined || Number(body.price) < 0.01) {
    if (body.name === undefined) error.push('Name is required')
    if (body.price === undefined) error.push('Price is required')
    else if (Number(body.price) < 0.01) error.push('Price cannot be less than 1 cent')

    // set errors for return
    response = {
      status: 400,
      message: 'Incorrect information',
      errors: error
    }
  } else {
    // parse data from JSON into array
    const costumeArray = JSON.parse(fs.readFileSync(path.join(__dirname, costumeShop, 'costumes.json'), 'utf-8'))

    // set costume key-values
    const costume = {
      id: uuid(),
      name: body.name,
      price: Number(body.price),
      description: body.description ? body.description : 'None',
      tag: []
    }
    // set reponse to costume for return
    response = costume

    // push costume into array, parse it, and write it back into data
    costumeArray.push(costume)
    fs.writeFileSync(path.join(__dirname, costumeShop, 'costumes.json'), JSON.stringify(costumeArray))
  }

  return response
}

getAll = (limit) => {
  const costumeArray = JSON.parse(fs.readFileSync(path.join(__dirname, costumeShop, 'costumes.json'), 'utf-8'))

  const displayHowMany = (!limit) ? costumeArray : (limit > costumeArray.length) ? { status: 400, message: `Cannot list costumes of value ${limit}`, error: 'Bad request' } : costumeArray.slice(0, limit)

  return displayHowMany
}

getById = (id) => {
  const costumeArray = JSON.parse(fs.readFileSync(path.join(__dirname, costumeShop, 'costumes.json'), 'utf-8'))
  let response

  const costume = costumeArray.find(costume => costume.id === id)

  if (!costume) {
    response = {
      status: 404,
      message: `Could not find costume of id ${id}`,
      error: 'Not Found'
    }
  } else {
    response = costume
  }

  return response
}

update = () => {

}

deleteById = () => {

}

module.exports = { create, getAll, getById, update, deleteById }
