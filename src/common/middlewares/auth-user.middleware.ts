import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, NextFunction } from 'express';
import * as jose from 'node-jose';
import * as jwt from 'jsonwebtoken';
import base64url from 'base64url';
import { IRequestWithUser } from '@app/common/interfaces/request-with-user.interface';

@Injectable()
export class AuthUserMiddleware implements NestMiddleware {
  private readonly userPoolId: string;
  private readonly clientId: string;
  private readonly region: string;
  constructor(private configService: ConfigService) {
    this.userPoolId = this.configService.get<string>('aws.cognitoPoolId');
    this.clientId = this.configService.get<string>('aws.cognitoClientId');
    this.region = this.configService.get<string>('aws.awsRegion');
  }

  async use(req: IRequestWithUser, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.split(' ')[1]
        : null;
      if (!token) throw new Error();
      if (token) {
        const keysUrl = `https://cognito-idp.${this.region}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;
        const decodedJwt = jwt.decode(token, { complete: true });
        if (!decodedJwt) throw new Error('Not a valid JWT token');
        const { header } = decodedJwt;
        const { kid } = header;
        const finalResponse = await validateToken({
          kid,
          keysUrl,
          token,
          userPoolClientId: this.clientId,
        });
        if (finalResponse.error) throw new Error(finalResponse.message);
        req.cognito_user_id = finalResponse.sub;
        req.phone_number = finalResponse.phone_number;
      }
      return next();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}

const validateToken = async ({ kid, keysUrl, token, userPoolClientId }) => {
  try {
    const data = await fetch(keysUrl);
    const body = await data.json();
    const { keys } = body;
    let key_index = -1;
    for (let i = 0; i < keys.length; i++) {
      if (kid === keys[i].kid) {
        key_index = i;
        break;
      }
    }
    if (key_index === -1) throw new Error('Public key not found in jwks.json');
    const result = await jose.JWK.asKey(keys[key_index]);
    const keyVerify = jose.JWS.createVerify(result);
    await keyVerify.verify(token);
    const components = token.split('.');
    const claims = JSON.parse(base64url.decode(components[1]));
    const current_ts = Math.floor(Date.now() / 1000);
    if (current_ts > claims.exp) throw new Error('Token is expired');
    if (claims.aud !== userPoolClientId) throw new Error('Token is expired');
    return claims;
  } catch (error) {
    throw new UnauthorizedException();
  }
};
