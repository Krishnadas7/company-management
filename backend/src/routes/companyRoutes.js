import express from 'express';
import { createCompany, getCompanies,companyLogin } from '../controllers/companyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createCompany);
router.post('/login',companyLogin)
router.get('/', getCompanies);

export default router;
