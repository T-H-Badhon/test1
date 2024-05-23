import jwt, { Secret } from 'jsonwebtoken'
import config from '../../config';

const generateToken = (payload:any) => {
    // console.log(config.jwt.expires_in)
    const token = jwt.sign(
        payload,
        config.jwt.jwt_secret as Secret,
        {
        algorithm:'HS256',
        expiresIn:'30d'
        }
    )
    return token;
}


export default generateToken;
