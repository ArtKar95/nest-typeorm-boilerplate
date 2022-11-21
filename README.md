## Description

The app is based on Nest.js(v 8.2.4) and TypeScript. Also has an implementation for the TypeORM to work with the Database. The app dockerized as well

## Configurations

The all configurations are in the `./config` folder. The existing configs

- app.ts - Application configs, like port, host, env and so one
- database.ts - The database and TypeORM configurations
- swagger.ts - Swagger configuration
- cors.ts - Cors configuration

## Dependencies installation

```bash
$ yarn
```

## Environment variables configuration

```bash
$ cp .env.example .env
```

## Perform migrations in your database using TypeORM

The command will run the all migrations from the `./migrations` folder

```bash
$ yarn migration:run
```

## Running the app

```bash
# dev
$ yarn start:dev

# debug
$ yarn start:debug

# production mode
$ yarn start:prod
```

## Run in Docker Container

```bash
$ docker-compose up

# OR, to run in background
$ docker-compose up -d
```

## Swagger UI

http://localhost:3000/api/doc
# nest-typeorm-boilerplate
# nest-typeorm-boilerplate
# nest-typeorm-boilerplate
