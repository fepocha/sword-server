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
const app = express();

app.get('/api/words', getWords);
app.get('/api/words/random', getRandomWord);
app.post('/api/words', createWord);
app.get('/api/words/:wordId', getWordDetails);
app.get('/api/words/:wordId/answers/:answerId', getAnswer);
app.put('/api/words/:wordId/answers/:answerId', updateAnswer);
app.get('/api/words/:wordId/results', getWordResults);

export default app;
