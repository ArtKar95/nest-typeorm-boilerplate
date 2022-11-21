import * as Joi from 'joi';

export default {
  TYPEORM_TYPE: Joi.string().default('postgres'),
  TYPEORM_HOST: Joi.string(),
  TYPEORM_USERNAME: Joi.string(),
  TYPEORM_PASSWORD: Joi.string(),
  TYPEORM_DATABASE: Joi.string(),
  TYPEORM_PORT: Joi.number().default(5432),
  TYPEORM_LOGGING: Joi.string(),
  TYPEORM_MIGRATIONS_RUN: Joi.string(),
  TYPEORM_SYNCHRONIZE: Joi.string(),
  TYPEORM_AUTO_LOAD_ENTITIES: Joi.string(),
};
