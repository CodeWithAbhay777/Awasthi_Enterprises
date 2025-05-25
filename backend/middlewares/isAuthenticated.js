import jwt from 'jsonwebtoken';

const isAuthenticated = async(req,res,next) => {
    try {
        const token = req.cookies.awasthi_token;

        if (!token){
            return res.status(401).json({
                msg : "User not authenticated",
                success: false,
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({
                msg : "Invalid token",
                success: false,
            })
        }

        req.user_id = decode.userId;

        
        next();

    } catch (error) {
        console.log(error);
    }
}

export default isAuthenticated;