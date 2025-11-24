import jwt from 'jsonwebtoken';

const adminLogin = (req,res) => {
    try {
        const { email, password } = req.body;
         if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.status(200).json({message:  'Logged in Successfully', success: true, token})
         }else{ 
            res.status(400).json({message: 'Invalid Credential', success: false})
         } 
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message: 'Not Authorized ', success: false})
    }
}

export default adminLogin;