import express from 'express';
import { getWords, createWord } from '../../controller/words';

const app = express();

app.get('/words', getWords);
app.post('/words', createWord);

export default app;
