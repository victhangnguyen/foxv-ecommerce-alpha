import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

//! library
import Logging from './library/Logging.js';

//! config
import config from './config/index.js';

//! imp routes
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

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
