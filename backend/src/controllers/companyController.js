import Company from '../models/company.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const createCompany = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt); 

    const company = new Company({ name, phone, email, password: hashedPassword });
    await company.save();

    res.status(201).json({ message: "Company registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const companyLogin = async (req, res) => {
  try {
    console.log('cdjsfkl',req.body);
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const company = await Company.findOne({ email });
    console.log(company);
    
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    console.log(isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: company._id, email: company.email },
      "secret", 
      { expiresIn: "7d" } 
    );

    res.status(200).json({
      message: "Login successful",
      token,
      company: {
        id: company._id,
        email: company.email,
        name: company.name,
      },
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Server error", error: error.message });
  }
};