import jwt from 'jsonwebtoken';

const userAuth = async(req, res , next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.json({success:false , message :"Not Authorized login again"});
    }

    try {
        const tokenDecode =jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
            console.log("decoded:", tokenDecode);
        }else{
            return res.json({success :false , message :"Not Authorized, Login again"})
        }
        
        next(); //

    } catch (error) {
        res.json({successs: true , message:error.message});
    }
}
export default userAuth;