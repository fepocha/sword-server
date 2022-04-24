import express from 'express';
import {
  createAnswer,
  createWord,
  getAnswer,
  getRandomWord,
  getWordDetails,
  getWords,
  updateAnswer,
} from '../controller/words';
const router = express.Router();

router.get('/words', getWords);
router.get('/words/random', getRandomWord);
router.post('/words', createWord);
router.get('/words/:wordId', getWordDetails);
router.post('/words/:wordId/answers', createAnswer);
router.get('/words/:wordId/answers/:answerId', getAnswer);
router.put('/words/:wordId/answers/:answerId', updateAnswer);

export default router;
