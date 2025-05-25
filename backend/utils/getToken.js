import jwt from 'jsonwebtoken';

export const generateToken = (res , user , msg) => {
    const token = jwt.sign({
        userId : user._id,
    } , process.env.JWT_SECRET , {expiresIn : '1d'});


    return res.status(200)
    .cookie("awasthi_token" , token , {httpOnly:true , sameSite:'strict' , maxAge:24*60*60*1000})
    .json({
        success : true,
        msg,
        user ,
    });
}