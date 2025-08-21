import jwt from 'jsonwebtoken';

const ensureAuthenticated = (req, res, next) =>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(401).send({message: "Unauthorized user"});
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({message: "wrong jwt token"});
    }
}

export default ensureAuthenticated;