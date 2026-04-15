const express = require('express')
const router = express.Router()
const entryController = require('../controllers/EntryController')

router.get('/',       entryController.getAllEntries)
router.get('/:id',    entryController.getEntry)
router.post('/',      entryController.createEntry)
router.put('/:id',    entryController.updateEntry)
router.delete('/:id', entryController.deleteEntry)

module.exports = router
