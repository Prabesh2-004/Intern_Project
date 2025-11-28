import userModel from '../model/user.model.js';
import { validationResult } from 'express-validator';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'User with this email already exist.',
        });
    }

    const avatar = gravatar.url(email, {
      s: '150',
      r: 'pg',
      d: 'mm',
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      avatar,
      cartItem: {},
    });

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: 'Token Generation Failed' });
        }

        res.status(201).json({
          message: 'User created Successfully',
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
          },
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'User registration failed' });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      res.status(404).json({ success: false, message: 'Invalid Credentials' });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      res.status(404).json({ success: false, message: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: 'Token Generation Failed' });
        }

        res.status(200).json({
          message: 'Login Successfully',
          success: true,
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          },
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'User login failed' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Failed to get users', success: false });
  }
};

export const userLogin = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Successfully Deleted', success: true });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to delete user', success: false });
  }
};
