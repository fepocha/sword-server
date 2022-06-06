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

app.get('/words', getWords);
app.get('/words/random', getRandomWord);
app.post('/words', createWord);
app.get('/words/:wordId', getWordDetails);
app.get('/words/:wordId/answers/:answerId', getAnswer);
app.put('/words/:wordId/answers/:answerId', updateAnswer);
app.get('/words/:wordId/results', getWordResults);

export default app;
