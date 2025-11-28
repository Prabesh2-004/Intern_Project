import jwt, { decode } from 'jsonwebtoken';

export const adminAuth = async (req, res, next) => {
  let token;

  try {
    if(req.headers['auth-token']) {
        token = req.headers['auth-token']
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }else if(req.headers.token) {
        token = req.headers.token;
    }

    if(!token) {
        return res.status(400).json({message: 'Not Authorized, Token Failed', success: false})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const payloadStr = typeof decoded === 'string' ? decoded : (decoded)?.user || JSON.stringify(decoded);
    
    if(payloadStr !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        return res.status(400).json({success:false,  message: 'Token Failed, Not Authorized to change'});
    }

    next()
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({
      success: false,
      message: 'Token is not valid',
    });
  }
};
