import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  try {
    let token;

    if(req.headers['auth-token']){
        token = req.headers['auth-token']
    }else if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }else if (req.headers.token) {
        token = req.headers.token
    }

    if(!token) {
        res.status(400).json({success: false, message: 'Token Failed, Not Authorized'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded?.user?.id || decoded?.id || decoded;
    req.user = { id: userID, _id: userID};

    next();

  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({
      success: false,
      message: 'Token is not valid',
    });
  }
};
