import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const config = {
  MONGODB_URI,
  TOKEN_SECRET,
};

export default config;
