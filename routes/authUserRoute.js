import express from 'express';
import { fetch, create, update, deleteUser } from '../controller/authUserController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/getallusers', auth, fetch);
router.post('/create', create);       // or disable if you want to only register via /auth/register
router.put('/update/:id', auth, update);
router.delete('/delete/:id', auth, deleteUser);

export default router;
