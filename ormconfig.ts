export default {
  name: 'default',
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: process.env.TYPEORM_PORT,
  logging: process.env.TYPEORM_LOGGING,
  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/*.ts'],
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  cli: {
    entitiesDir: 'src/db/entity',
    migrationsDir: 'migrations',
  },
};
