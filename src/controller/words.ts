import { RequestHandler } from 'express';
import Words from '../models/Words';

export const getWords: RequestHandler = async (req, res, next) => {
    try {
        const words = await Words.find().exec();

        res.json(words);
    } catch (e) {
        next(e);
    }
};

export const createWord: RequestHandler = async (req, res, next) => {
    try {
        const { word, description } = req.body;

        const newWord = await new Words({
            word,
            description,
        }).save();

        res.json(newWord);
    } catch (e) {
        console.log(e);
        next(e);
    }
};
