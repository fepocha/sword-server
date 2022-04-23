import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const DICTIONARY_API_URL = process.env.DICTIONARY_API_URL;

const config = {
  MONGODB_URI,
  TOKEN_SECRET,
  DICTIONARY_API_URL,
};

export default config;
