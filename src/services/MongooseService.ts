import mongoose from 'mongoose';

import config from '../config';

export const connectDb = async () => {
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
};
