# Task Organizer

This project uses a LAMP stack (Linux, Apache, MySQL, PHP) and Angular in order to provide a responsive to-do list and task organizer meant for personal organization.

## Running the development server

To run a development server, you will need both [Docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/). Once these are installed and configured, simply build the project in Angular and start the Docker Compose configuration:

```sh
npm install
npm run build
docker-compose up
```

Running this command for the first time might take some time.

Now, visiting <http://localhost:8080> will take you to the webpage hosted via Docker Compose, and <http://localhost:8081> will take you to the MyPHPAdmin configuration page, where you can add a user.
