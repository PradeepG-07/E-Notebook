import "dotenv/config";
import jsonwebtoken from "jsonwebtoken";

const JWT=jsonwebtoken;
const JWT_SECRET=process.env.JWT_SECRET;

const verifyUser=(req,res,next)=>{
    let authtoken=req.header('authtoken');
    if(!authtoken){
        return res.status(401).send({error:"Please use a valid auth token"})
    }
    try {
        const payload=JWT.verify(authtoken,JWT_SECRET);
        req.user=payload.user;
    } catch (error) {
        return res.status(401).send({error:"Please use a valid auth token"});
    }
    next();
}
export default verifyUser;