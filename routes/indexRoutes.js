import { Router } from "express";
import IndexRouter from '../controllers/indexController.js';

const router = Router();

router.get('/', IndexRouter.homepage);
router.get('/about', IndexRouter.about);

export default router;
