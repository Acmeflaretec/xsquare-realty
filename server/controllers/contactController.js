const Contact = require('../models/contact');

const createContact = async (req, res) => {
    
  const { name, email, phoneNumber, requirement, homeLoan } = req.body;
  


  try {
    const newContact = await Contact.create({
      name,
      email,
      phoneNumber,
      requirement,    
      homeLoan,
    });

    res.status(201).json({
      message: 'Contact message created successfully',
      contact: newContact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const  getContacts = async (req, res) => {
  console.log('getContacts');    
  
  try {
    const { page = 1, perPage = 10, sortBy = 'createdAt', order = 'desc', search = '' } = req.query;
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(perPage, 10),
      sort: { [sortBy]: order === 'desc' ? -1 : 1 }
    };

    const data = await Contact.paginate(query, options);;
    
    

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
};

const updateContactStatus = async (req, res) => {
  console.log('updateUserStatus');
  
  const { userId, newStatus } = req.body;
  console.log(userId, newStatus);
  
  try {
    const contact = await Contact.findById(userId);
    if (!contact) {
      return res.status(404).json({ message: 'contact not found' });
    }
    if(newStatus){
      contact.is_verified = !contact?.is_verified;  
    }

    
    await contact.save();

    res.status(200).json({ message: 'user contact status updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' });
  }
};

module.exports = { 
  createContact,
  updateContactStatus,
  getContacts
 };
