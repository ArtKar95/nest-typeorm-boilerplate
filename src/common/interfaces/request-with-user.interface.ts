import { Request } from 'express';

export interface IRequestWithUser extends Request {
  cognito_user_id: string;
  phone_number: string;
}
