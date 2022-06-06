import express from 'express';
import {
  createWord,
  getAnswer,
  getRandomWord,
  getWordDetails,
  getWords,
  updateAnswer,
  getWordResults,
} from '../controller/words';
const router = express.Router();

router.get('/words', getWords);
router.get('/words/random', getRandomWord);
router.post('/words', createWord);
router.get('/words/:wordId', getWordDetails);
router.get('/words/:wordId/answers/:answerId', getAnswer);
router.put('/words/:wordId/answers/:answerId', updateAnswer);
router.get('/words/:wordId/results', getWordResults);

export default router;
