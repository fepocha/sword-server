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

router.get('/api/words', getWords);
router.get('/api/words/random', getRandomWord);
router.post('/api/words', createWord);
router.get('/api/words/:wordId', getWordDetails);
router.get('/api/words/:wordId/answers/:answerId', getAnswer);
router.put('/api/words/:wordId/answers/:answerId', updateAnswer);
router.get('/api/words/:wordId/results', getWordResults);

export default router;
