import { messageUser, EXPIRETIME, SECRET_KEY } from "../config/constants";
import jwt from "jsonwebtoken";
import { IJwt } from "../interfaces/jwt.interface";

class JWT {
  private secreteKey = SECRET_KEY as string;

  sign(data: IJwt, expiresIn: number = EXPIRETIME.M1) {
    return jwt.sign(
      { user: data.user },
      this.secreteKey,
      { expiresIn } //30 dias
    );
  }

  verify(token: string) {
    try {
      return jwt.verify(token, this.secreteKey);
    } catch (error) {
      console.log(error);
      return messageUser.TOKEN_VERICATION_FAILED;
    }
  }
}

export default JWT;
