import { RequestHandler } from 'express';
import Words from '../models/Words';
import Answers from '../models/Answers';
import createHttpError from 'http-errors';
import { isWordInDictionary } from '../services/DictionaryService';
import { getResultAnswer } from '../services/WordService';

export const getWords: RequestHandler = async (req, res, next) => {
  try {
    const words = await Words.find().select('-updatedAt').exec();

    res.json(words);
  } catch (e) {
    next(e);
  }
};

export const createWord: RequestHandler = async (req, res, next) => {
  try {
    const { description, createdBy } = req.body;
    const word = req.body.word.toUpperCase();

    const isValidWord = await isWordInDictionary(word);
    if (!isValidWord) {
      throw createHttpError(400, 'word is not in dictionary');
    }

    const newWord = await new Words({
      word: word.toUpperCase(),
      description,
      createdBy,
    }).save();

    res.json(newWord);
  } catch (e: any) {
    if (e.code === 11000) {
      next(createHttpError(400, 'word must be unique'));
    }

    next(e);
  }
};

export const getRandomWord: RequestHandler = async (req, res, next) => {
  try {
    const excludedWords = req.query.excludedWords || [];
    const count = await Words.count({ _id: { $nin: excludedWords } }).exec();
    const randomIndex = Math.floor(Math.random() * count);
    const word = await Words.findOne({ _id: { $nin: excludedWords } })
      .skip(randomIndex)
      .exec();
    console.log(word);
    const newAnswer = await new Answers({
      step: 0,
      answers: [],
      isSolved: false,
      word: word.word,
      wordId: word._id,
      answerMatrix: [],
    }).save();

    res.json({ ...word.toJSON(), answerId: newAnswer._id });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getWordDetails: RequestHandler = async (req, res, next) => {
  try {
    const { wordId } = req.params;
    const [word, answers] = await Promise.all([
      Words.findById(wordId).select('-updatedAt').exec(),
      Answers.find({ word: wordId }).select('-updatedAt').exec(),
    ]);

    res.json({ ...word.toJSON(), answers });
  } catch (e) {
    next(e);
  }
};

export const getAnswer: RequestHandler = async (req, res, next) => {
  try {
    const { answerId } = req.params;

    const newAnswer = await Answers.findById(answerId).lean().exec();

    res.json(newAnswer);
  } catch (e: any) {
    next(e);
  }
};

export const updateAnswer: RequestHandler = async (req, res, next) => {
  try {
    const { wordId, answerId } = req.params;
    const answer = req.body.answer.toUpperCase();

    const { isSolved, result } = await getResultAnswer(answer, wordId);

    const newAnswer = await Answers.findByIdAndUpdate(
      answerId,
      {
        $inc: { step: 1 },
        $push: { answers: answer, answerMatrix: result },
        isSolved,
      },
      { new: true },
    ).exec();

    res.json(newAnswer);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getWordResults: RequestHandler = async (req, res, next) => {
  try {
    const { wordId } = req.params;

    const word = await Words.findById(wordId);
    const answers = await Answers.find({ wordId }).exec();

    const solvedAnswers = answers
      .map((answer) => answer.toJSON())
      .filter(({ isSolved }) => isSolved);
    const failedAnswers = answers.filter(
      ({ isSolved, step, maxStep }) => !isSolved && step === maxStep,
    );

    const results = {
      word: word.toJSON(),
      solvedAnswers,
      statistics: {
        answersCount: answers.length,
        win: solvedAnswers.length,
        lose: failedAnswers.length,
        winningRate: Math.round((solvedAnswers.length / answers.length) * 100),
      },
    };

    res.json(results);
  } catch (e) {
    next(e);
  }
};
