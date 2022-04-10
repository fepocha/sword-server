import createHttpError from 'http-errors';
import { isWordInDictionary } from './DictionaryService';
import Words from '../models/Words';

export const getResultAnswer = async (answer: string, wordId: string) => {
  const isValidAnswer = await isWordInDictionary(answer);
  if (!isValidAnswer) {
    throw createHttpError(400, 'answer is not in dictionary');
  }

  const words = await Words.findById(wordId).lean().exec();
  const result = checkAnswer(answer, words.word);

  return {
    isSolved: isSolved(result),
    result,
    word: words.word,
  };
};

export const checkAnswer = (answer: string, word: string) => {
  const answerArr = answer.split('');
  const wordArr = word.split('');
  const result: string[] = new Array(answerArr.length).fill('0');

  if (answerArr.length !== wordArr.length) {
    throw createHttpError(400, 'Inappropriate length of answer.');
  }

  answerArr.forEach((text, i) => {
    const word = wordArr.shift();

    if (!word) {
      return;
    }

    if (text === word) {
      answerArr[i] = '';
      result[i] = '2';
      return;
    }

    const index = answerArr.findIndex((answer) => answer === word);

    if (index > -1) {
      answerArr[index] = '';
      result[index] = '1';
      return;
    }

    answerArr[index] = '';
  });

  return result;
};

export const isSolved = (answer: string[]) => {
  return answer.every((result) => result === '2');
};
