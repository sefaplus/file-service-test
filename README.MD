# What the app does

This a service app that accepts any ongoind POST requests to `domain/files/:filename` and saves the attached binary to the request, with the filename. As well as saving the metadata of this file to MongoDB.

It also returns the files, that have already been uploaded, by doing a GET request to `domain/files/:filename`, returning the file.

# Configuration

In the `server.ts` change the cors options origin to the domain you use.

To configure type of storage, change `STORAGE_TYPE` Enviromental variable to any you desire.

If youre using docker compose, change `USING_DOCKER_COMPOSE` to `1`

# ENV EXPLAINED

`STORAGE_TYPE` - type of storage youre using. (LOCAL, FTP, WEBSOCKET)

`MAX_FILE_LIMIT` - file limit in mb

`PORT` - port the app uses

`USING_DOCKER_COMPOSE` - whenether youre using docker compose or not (0 OR 1)

`LOCAL_SAVE_PATH` - local save path from root

`MONGO_ROOT_USER` - username of the locally deployed mongo container

`MONGO_ROOT_PASS` - password of locally deployed mongo container

`MONGO_URL` - a local mongo url with credentials

`MONGO_CLOUD_URL` - a cloud mongo url with credentials

`MONGO_DB_NAME` - database name to use

# HOW TO START

## Entirely local:

Make sure you have `docker` and `docker-compose` installed.

1. In the .env file, change `USING_DOCKER_COMPOSE` variable to `1` if not already set.

2. Navigate to the root directory where `docker-compose.yml` lays, open in terminal and run `docker-compose up --build`.
   This should start the containers and you can then access the final app on `http://localhost:env.PORT`.

## Server local / MongoDB cloud based

1. In the .env file, change `USING_DOCKER_COMPOSE` variable to `0` if not already set.
2. In the .env file, change `MONGO_CLOUD_URL` to the provided URL from your host. Which rougly looks like this: `mongodb+srv://mongouser:mongopass@database.gxoqj.mongodb.net/?retryWrites=true&w=majority`
3. Open terminal in the root directory, and run `npm run build`, to build js.
4. Then run `npm start` to start the server.
5. You can access the final app on `http://localhost:env.PORT`.
