import { Router } from 'express';
import { thoughtRoutes } from './thoughtRoutes.ts';
import { userRoutes } from './usersRoutes.ts';)

const router = Router();

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

export default router;
