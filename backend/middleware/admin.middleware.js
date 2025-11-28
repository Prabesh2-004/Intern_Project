import jwt from 'jsonwebtoken';

export const adminAuth = async (req, res, next) => {
  let token;

  try {
    if (req.headers['auth-token']) {
      token = req.headers['auth-token'];
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.headers.token) {
      token = req.headers.token;
    }

    if (!token) {
      return res
        .status(400)
        .json({ message: 'Not Authorized, Token Failed', success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Allow tokens that explicitly include an admin role, or match ADMIN_EMAIL/PASSWORD
    if (decoded?.role === 'admin') {
      return next();
    }

    if (
      decoded.email !== process.env.ADMIN_EMAIL ||
      decoded.password !== process.env.ADMIN_PASSWORD
    ) {
      console.error(
        'Admin auth failed. Decoded token:',
        decoded,
        'Expected ADMIN_EMAIL:',
        process.env.ADMIN_EMAIL
      );
      return res.status(400).json({
        success: false,
        message: 'Token Failed, Not Authorized to change',
      });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({
      success: false,
      message: 'Token is not valid',
    });
  }
};
