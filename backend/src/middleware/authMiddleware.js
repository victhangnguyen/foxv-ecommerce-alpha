import jwt from 'jsonwebtoken';

//! imp library
import Logging from '../library/Logging.js';

//! imp configs
import config from '../config/index.js';

const auth = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      const isCustomAuth = token.length < 500;

      //! guard clause if no auth
      if (token && isCustomAuth) {
        const decodedData = jwt.verify(token, config.general.node.jwtSecret);
        //! req -> userId
        req.userId = decodedData.id;
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no Token!');
    }

    next();
  } catch (error) {
    Logging.error('__Debugger__mdw__authMiddleware__error: ' + error);
  }
};



export default { auth };
