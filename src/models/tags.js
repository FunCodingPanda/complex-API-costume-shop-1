const fs = require('fs')
const path = require('path')
const costumeShop = '../../costume-shop'
const uuid = require('uuid/v4')

create = (id, body) => {
  const costumeArray = JSON.parse(fs.readFileSync(path.join(__dirname, costumeShop, 'costumes.json'), 'utf-8'))
  const errors =[]
  const regex = RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')
  let response

  const costume = costumeArray.find(costume => costume.id === id)

  if (!costume) {
    return {
      status: 404,
      message: `Could not find costume of id: ${id}`,
      error: 'Not Found'
    }
  }
  else if (body.name === undefined) errors.push('Name is required')
  else if (body.name.length > 10) errors.push('Name cannot be any longer than 10 characters')
  if (body.color && !regex.test(body.color)) errors.push('Colors must be in a correct hex value')

  // set up response depending on errors
  if (errors.length > 0) {
    return {
      status: 400,
      message: 'Incorrect information',
      errors
    }
  } else {
    const tag = {
      id: uuid(),
      name: body.name,
      color: body.color
    }
    const index = costumeArray.indexOf(costume)
    costumeArray[index].tags.push(tag)

    response = tag

    fs.writeFileSync(path.join(__dirname, costumeShop, 'costumes.json'), JSON.stringify(costumeArray))
  }

  return response
}

getById = (id) => {
  const costumeArray = JSON.parse(fs.readFileSync(path.join(__dirname, costumeShop, 'costumes.json'), 'utf-8'))
  const index = costumeArray.findIndex(costume => costume.id === id)

  if (index === -1) {
    return {
      status: 404,
      message: `Could not find costume of id ${id}`,
      error: 'Not Found'
    }
  } else {
    return costumeArray[index].tags
  }
}

update = (id, tagId, body) => {
  const costumeArray = JSON.parse(fs.readFileSync(path.join(__dirname, costumeShop, 'costumes.json'), 'utf-8'))
  const costumeIndex = costumeArray.findIndex(costume => costume.id === id)
  const tagIndex = (costumeIndex !== -1) ? costumeArray[costumeIndex].tags.findIndex(tag => tag.id === tagId) : -1
  const errors = []
  const regex = RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')
  let reponse

  if (costumeIndex === -1) {
    return {
      status: 404,
      message: `Could not find costume of id ${id}`,
      error: 'Costume Not Found'
    }
  } else if (tagIndex === -1) {
    return {
      status: 404,
      message: `Could not find tag of id ${tagId}`,
      error: 'Tag Not Found '
    }
  }
  else if (body.name === undefined) errors.push('Name is required')
  else if (body.name.length > 10) errors.push('Name cannot be any longer than 10 characters')
  if (body.color && !regex.test(body.color)) errors.push('Colors must be in a correct hex value')

  // set up response depending on errors
  if (errors.length > 0) {
    return {
      status: 400,
      message: 'Incorrect information',
      errors
    }
  } else {
    const tag = {
      id: tagId,
      name: body.name,
      color: body.color
    }
    costumeArray[costumeIndex].tags[tagIndex] = tag

    response = tag

    fs.writeFileSync(path.join(__dirname, costumeShop, 'costumes.json'), JSON.stringify(costumeArray))
  }

  return response
}

deleteById = (id, tagId) => {
  const costumeArray = JSON.parse(fs.readFileSync(path.join(__dirname, costumeShop, 'costumes.json'), 'utf-8'))
  const costumeIndex = costumeArray.findIndex(costume => costume.id === id)
  const tagIndex = (costumeIndex !== -1) ? costumeArray[costumeIndex].tags.findIndex(tag => tag.id === tagId) : -1

  if (costumeIndex === -1) {
    return {
      status: 404,
      message: `Could not find costume of id ${id}`,
      error: 'Costume Not Found'
    }
  } else if (tagIndex === -1) {
    return {
      status: 404,
      message: `Could not find tag of id ${tagId}`,
      error: 'Tag Not Found '
    }
  } else {
    costumeArray[costumeIndex].tags.splice(tagIndex, 1)
    fs.writeFileSync(path.join(__dirname, costumeShop, 'costumes.json'), JSON.stringify(costumeArray))
  }

  return true
}

module.exports = { create, getById, update, deleteById }
