import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//! imp library
import Logging from '../library/Logging.js';

//! imp config
import config from '../config/index.js';

//! imp models
import UserModal from '../models/user.js';

export const signin = async (req, res, next) => {
  //! Signin username and password will get the Token that used to authenticated
  const { email, password } = req.body;

  try {
    const existingUser = await UserModal.findOne({ email: email });

    //! guard clause existingUser
    if (!existingUser)
      return res.status(404).json({
        message: "User don't exists",
      });

    //! if User exists
    const isMatch = await bcrypt.compare(password, existingUser.password);

    //! guard clause Match password
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    //! sign(payload, secrectKey, options)
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      config.general.node.jwtSecret,
      { expiresIn: '1h' }
    );

    res.status(201).json({ result: existingUser, token: token });
  } catch (error) {
    Logging.error(error);

    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signup = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    //! check existing
    const existingUser = await UserModal.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    //! hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    //! create a new User
    const userDoc = await UserModal.create({
      name: `${firstName} ${lastName}`,
      email: email,
      password: hashedPassword,
    });

    //! sign(payload, secrectKey, options)
    const token = jwt.sign(
      { id: userDoc._id, email: userDoc.email },
      config.general.node.jwtSecret,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      result: userDoc,
      token: token,
    });
  } catch (error) {
    Logging.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
