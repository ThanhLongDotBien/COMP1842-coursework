const Customer = require('../models/Customer')
// CREATE
exports.createCustomer = async (req, res) => {
    try{
        const {Email} = req.body;
        const existingEmail = await Customer.findOne({Email: Email});
        if (existingEmail) {
            return res.status(400).json({success: false, error: "The email have already exists"});
        }
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json({data: customer, message: "Your account have register successfully!"});
    } catch (error) { 
        res.status(500).json({success: false, error: "System error!"});};
}

//READ
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        if (!customers || customers.length === 0){
            return res.status(400).json({data: [], success: false, error: "Customer list is empty!"})
        };
        res.status(200).json({data: customers, success: true, message: "Customer list here", count: customers.length, });
    } catch (error){
        res.status(500).json({success: false, error: "System error!"});

    }
}

exports.getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer){
            res.status(400).json({success: false, message: "Customer not found with the provided ID!", error: error.message});
        };
        res.status(200).json({success: true, data: customer});
    } catch (error){
        res.status(500).json({success: false, message: "System Error!", error: error.message});
    }
}
//UPDATE
exports.updateCustomer = async (req, res) => {
  try {
    const {id} = req.params;
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(400).json({success: false, message: "Customer not found to update!", error: error.message})
    };
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true, runValidators: true
    });
  res.status(200).json({success: true, data: updatedCustomer, message: "Your new information were updated!"});
  } catch (error) {
    res.status(500).json({success: false, message: "System error!", error: error.message })
  };
}
//DELETE
exports.deleteCustomer = async (req, res) => {
  try {
    const {id} = req.params;
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });
    res.json({ success: true, message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}