import { RequestHandler } from 'express';
import Words from '../models/Words';
import Answers from '../models/Answers';

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
    const { word, description, createdBy } = req.body;

    const newWord = await new Words({
      word,
      description,
      createdBy,
    }).save();

    res.json(newWord);
  } catch (e) {
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

export const createAnswer: RequestHandler = async (req, res, next) => {
  try {
    const { wordId } = req.params;
    const { step, answer, isSolved } = req.body;

    const newAnswer = await new Answers({
      step,
      answer,
      isSolved,
      word: wordId,
    }).save();

    res.json(newAnswer);
  } catch (e) {
    next(e);
  }
};

export const updateAnswer: RequestHandler = async (req, res, next) => {
  try {
    const { wordId, answerId } = req.params;
    const { step, answer, isSolved } = req.body;

    const newAnswer = await Answers.findByIdAndUpdate(
      answerId,
      {
        step,
        answer,
        isSolved,
        word: wordId,
      },
      { new: true },
    )
      .lean()
      .exec();

    res.json(newAnswer);
  } catch (e) {
    next(e);
  }
};
