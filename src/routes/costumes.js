const express = require('express')
const router = express.Router()
const costumesCtrl = require('../controllers/costumes')
const tagsCtrl = require('../controllers/tags')

router.post('/', costumesCtrl.create)
router.get('/', costumesCtrl.getAll)
router.get('/:id', costumesCtrl.getById)
router.put('/:id', costumesCtrl.update)
router.delete('/:id', costumesCtrl.deleteById)

router.post('/:id/tags', tagsCtrl.create)
router.get('/:id/tags', tagsCtrl.getById)
router.put('/:id/tags/:tagId', tagsCtrl.update)
router.delete('/:id/tags/:tagId', tagsCtrl.deleteById)


module.exports = router
