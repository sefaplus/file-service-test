# Enviromental variables example

## SERVER

```
STORAGE_TYPE=LOCAL
MAX_FILE_LIMIT=100
PORT=5000
USING_DOCKER_COMPOSE=0
LOCAL_SAVE_PATH=tmp/
```

## MONGO

```
MONGO_ROOT_USER=mongouser
MONGO_ROOT_PASS=mongopass
MONGO_URL=mongodb://mongouser:mongopass@mongo:27017/
MONGO_CLOUD_URL=mongodb+srv://mongouser:mongopass@database.gxoqj.mongodb.net/?retryWrites=true&w=majority
MONGO_DB_NAME=FilesDB
```

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
