# heroku-getir
This is a sample application coded for the pre-selection of a hackathon prepared by Getir and BiTaksi. It exposes an api endpoint which queries a mongodb database to retrieve single record by a given key.

## Assumptions
- GET method is not allowed.
- Given `key` cannot be empty and is atleast 1 character long.
- There is only one record in the database which corresponds to the given key.

## Configurations
Configurations related to the environment are stored in the [src/config.js](./src/config.js). This configurations contain the below fields and may be used to configure the application through environment variables.

- `PORT` the port the rest api will start on. Default value is 8080.
- `MONGODB_CONNECTION_STRING` the connection string to the database which will be used to query the records. 

### Running Locally
There is [Dockerfile](./Dockerfile) present at the root of this project. You can run the project locally by executing the following commands. If you would like to configure the project use another database, create an dotenv file like `development.env` and use the `--env-file` to point to this file while running `docker run` command.

```
docker build -t heroku-getir:latest .
# Change the 8080:8080 to something like 7070:8080 to run the service on another port.
docker run -it -p 8080:8080 heroku-getir:latest
```

Another Dockerfile called [Dockerfile.development](./Dockerfile.development) is added to show how you could use Docker to have auto-reload while developing this project.