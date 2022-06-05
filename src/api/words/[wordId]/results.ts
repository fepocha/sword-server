import express from 'express';
import { getWordResults } from '../../../controller/words';

const app = express();

app.get('/words/:wordId', getWordResults);

export default app;
