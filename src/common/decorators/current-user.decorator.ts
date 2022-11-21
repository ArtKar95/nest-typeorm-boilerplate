import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (property: string, ectx: ExecutionContext) => {
    const ctx = ectx.getArgByIndex(0);
    return {
      cognito_user_id: ctx.cognito_user_id,
      phone_number: ctx.phone_number,
    };
  },
);
