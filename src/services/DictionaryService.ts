import axios from 'axios';
import config from '../config';

export const searchWord = (word: string) => {
  return axios
    .get(`${config.DICTIONARY_API_URL}/${word}`)
    .then((res) => res.data);
};

export const isWordInDictionary = async (word: string) => {
  try {
    await searchWord(word);
    return true;
  } catch (e) {
    return false;
  }
};
