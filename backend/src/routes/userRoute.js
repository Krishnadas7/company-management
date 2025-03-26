import express from 'express';
import { addUserToCompany, getUsersByCompany } from '../controllers/userController.js';

const router = express.Router();

router.post('/add',  addUserToCompany);

router.get('/:companyId', getUsersByCompany);

export default router;
