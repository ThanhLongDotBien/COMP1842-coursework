const Entry = require('../models/Entry')

// READ tất cả (GET)
exports.getAllEntries = async (req, res) => {
  try{
    const entries = await Entry.find();
    if (!entries || entries.length === 0){
      return res.status(400).json({data: [], success: false, message: "The entry list is empty!", error: error.message})
    };
    res.status(200).json({success: true, data: entries});
  } catch (error) {
    res.status(500).json({success: false, message: "System error", error: err.message});
  }
}

// READ một entry (GET)
exports.getEntry = async (req, res) => {
  try{
    const entry = await Entry.findById(req.params.id);
    if(!entry) {
      return res.status(400).json({success: false, message: "Entry not found with the provided ID!", error: error.message});
    };
    res.status(200).json({success: true, data: entry}); //Tao Lam Viec Cua Tao, Hy Vong La May Thich No
  } catch (error) {
    res.status(500).json({success: false, message: "System Error!", error: err.message});
  }
}

// CREATE (POST)
exports.createEntry = async (req, res) => {
  try{
    const {issueCode} = req.body;
    const existingEntry = await Entry.findOne({issueCode: issueCode});
    if (existingEntry) {
      return res.status(400).json({success: false, message: "The entry code you add have already exists", error: "Duplicate issueCode"})
    };
    const entry = new Entry(req.body);
    await entry.save();
    res.status(201).json({success: true, data: entry, message: "Add new entry successfully!"});
} catch (error){
  res.status(500).json({success: false, message: "System error!", error: error.message});};
}

// UPDATE cập nhật (PUT)
exports.updateEntry = async (req, res) => {
  try {
    const {id} = req.params;
    const entry = await Entry.findById(id);
    if (!entry) {
      return res.status(400).json({success: false, message: "Entry not found to update!", error: error.message})
    };
    const updatedEntry = await Entry.findByIdAndUpdate(id, req.body, {
      new: true, runValidators: true
    });
  res.status(200).json({success: true, data: updatedEntry, message: "Your new information were updated!"});
  } catch (error) {
    res.status(500).json({success: false, message: "System error!", error: error.message });
  }
}

// DELETE 
exports.deleteEntry = async (req, res) => {
  try {
    const {id} = req.params;
    const entry = await Entry.findByIdAndDelete(id);
    if (!entry) return res.status(404).json({ success: false, message: 'Entry not found' });
    res.json({ success: true, message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};