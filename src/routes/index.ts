import express from 'express';
import {
  createAnswer,
  createWord,
  getWordDetails,
  getWords,
  updateAnswer,
} from '../controller/words';
const router = express.Router();

router.get('/words', getWords);
router.post('/words', createWord);
router.get('/words/:wordId', getWordDetails);
router.post('/words/:wordId/answers', createAnswer);
router.put('/words/:wordId/answers/:answerId', updateAnswer);

export default router;
