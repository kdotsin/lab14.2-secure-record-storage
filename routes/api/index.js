import e from 'express';
import userRoutes from './userRoutes.js'
import noteRoutes from './noteRoutes.js'

const router = e.Router();
 
router.use('/users', userRoutes);
router.use('/notes', noteRoutes);
 
export default router;