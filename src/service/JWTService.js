
import jwt from 'jsonwebtoken';

class JWTService {

	secretValue= "1231213232323232";
	secretEncoding= "base64";
	static myInstance = null;

	static getInstance() {
        if (JWTService.myInstance == null) {
            JWTService.myInstance = new JWTService();
        }

        return this.myInstance;
    }

	decryptJsonWebToken(token) {
		const secret = Buffer.from(this.secretValue, this.secretEncoding);
		const decodedUser = jwt.verify(token, secret);
		return decodedUser;
	}

}

export default JWTService;