const Entry = require('../models/Entry')

// GET /api/entries
exports.getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.find()
    if (!entries || entries.length === 0) {
      return res.status(200).json({ data: [], success: true, message: 'The entry list is empty!' })
    }
    res.status(200).json({ success: true, data: entries })
  } catch (error) {
    console.error('[EntryController] getAllEntries:', error.message)
    res.status(500).json({ success: false, message: 'System error', error: error.message })
  }
}

// GET /api/entries/:id
exports.getEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id)
    if (!entry) return res.status(404).json({ success: false, message: 'Entry not found' })
    res.status(200).json({ success: true, data: entry })
  } catch (error) {
    console.error('[EntryController] getEntry:', error.message)
    res.status(500).json({ success: false, message: 'System error', error: error.message })
  }
}

// POST /api/entries
exports.createEntry = async (req, res) => {
  try {
    const { issueCode, Response, Category } = req.body

    if (!issueCode || !Response || !Category) {
      return res.status(400).json({ success: false, message: 'issueCode, Response, and Category are required' })
    }

    const existing = await Entry.findOne({ issueCode })
    if (existing) {
      return res.status(400).json({ success: false, message: 'Issue code already exists' })
    }

    const entry = new Entry({ issueCode, Response, Category })
    await entry.save()
    res.status(201).json({ success: true, data: entry, message: 'Entry added successfully!' })
  } catch (error) {
    console.error('[EntryController] createEntry:', error.message)
    res.status(500).json({ success: false, message: 'System error', error: error.message })
  }
}

// PUT /api/entries/:id
exports.updateEntry = async (req, res) => {
  try {
    const { issueCode, Response, Category } = req.body
    const entry = await Entry.findById(req.params.id)
    if (!entry) return res.status(404).json({ success: false, message: 'Entry not found' })

    // Kiểm tra trùng issueCode với entry khác
    const duplicate = await Entry.findOne({ issueCode, _id: { $ne: req.params.id } })
    if (duplicate) {
      return res.status(400).json({ success: false, message: `Issue code "${issueCode}" already exists` })
    }

    const updated = await Entry.findByIdAndUpdate(
      req.params.id,
      { issueCode, Response, Category },
      { returnDocument: 'after', runValidators: true }
    )
    res.status(200).json({ success: true, data: updated, message: 'Entry updated!' })
  } catch (error) {
    console.error('[EntryController] updateEntry:', error.message)
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: `Issue code already exists` })
    }
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' })
  }
}

// DELETE /api/entries/:id
exports.deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findByIdAndDelete(req.params.id)
    if (!entry) return res.status(404).json({ success: false, message: 'Entry not found' })
    res.status(200).json({ success: true, message: 'Entry deleted!' })
  } catch (error) {
    console.error('[EntryController] deleteEntry:', error.message)
    res.status(500).json({ success: false, message: 'System error', error: error.message })
  }
}
