import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

const verifyToken =(token:string,secret:Secret) => {
    return jwt.verify(token,secret) as JwtPayload;
}

// console.log(verifyToken)
export const decodedToken = { verifyToken};
// console.log(decodedToken)