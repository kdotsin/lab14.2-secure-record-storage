
import apiRoutes from './api'

import e from 'express';
import apiRoutes from './api'

const router = e.Router()
router.use('/api', apiRoutes);
 
router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});
 
export default router;