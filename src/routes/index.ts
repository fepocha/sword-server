import express from 'express';
import { createWord, getWords } from '../controller/words';
const router = express.Router();

router.get('/words', getWords);
router.post('/words', createWord);

export default router;
