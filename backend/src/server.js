import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

//! library
import Logging from './library/Logging.js';

//! config
import config from './config/index.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb' }));
app.use(cors());

config.db
  .connectMongoDB()
  .then((result) => {
    app.listen(config.db.server.port, () => {
      Logging.log(`Server running on port ${config.db.server.port} 🚀🚀🚀`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
