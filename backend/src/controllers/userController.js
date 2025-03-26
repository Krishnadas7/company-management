import User from '../models/user.js';
import Company from '../models/company.js';

export const addUserToCompany = async (req, res) => {
  try {
    const { name, email, password, companyId } = req.body;

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ error: 'Company not found' });

    const user = new User({ name, email, password, company: companyId });
    await user.save();

    res.status(201).json({ message: 'User added to company successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsersByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const users = await User.find({ company: companyId }); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
