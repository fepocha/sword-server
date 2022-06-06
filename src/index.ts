import * as http from 'http';
import createError from 'http-errors';
import express, { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import config from './config';
import indexRouter from './api';

const cors = require('cors');
const index = express();
const port = process.env.PORT || '8000';
const whiteList = ['http://localhost:3000', 'https://www.wordssay.com'];

main();

async function main() {
  try {
    const { connections } = await mongoose.connect(config.MONGODB_URI || '');
    console.log('successful mongo connection');
    connections.forEach((connection) => {
      console.log('mongodb host: ' + connection.host);
      console.log('mongodb port: ' + connection.port);
    });
  } catch (err) {
    console.log(err);
  }
}
index.use(
  cors({
    origin: function (origin: string, callback: any) {
      const isSafeOrigin = whiteList.indexOf(origin) !== -1;
      callback(null, isSafeOrigin);
    },
    credentials: true,
  }),
);
// view engine setup
index.set('views', path.join(__dirname, 'views'));
index.set('view engine', 'ejs');

index.use(logger('dev'));
index.use(express.json());
index.use(express.urlencoded({ extended: false }));
index.use(cookieParser());
index.use(express.static(path.join(__dirname, 'public')));

index.use('/', indexRouter);

// catch 404 and forward to error handler
index.use(function (req, res, next) {
  next(createError(404));
});

// error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err);
};
index.use(errorHandler);

index.set('port', port);

const server = http.createServer(index);

index.listen(port, () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  console.log('Listening on ' + bind);
});

module.exports = index;
