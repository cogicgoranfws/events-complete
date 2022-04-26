## Getting Started


Database:
run `docker-compose up` to start up docker containers
Open `localhost:8001`, root credentials are found in `/events-backend/docker-compose-yml`
Create database `events-full-test` and collection `events`. Click on `--import mongoexport.json` button and select file in `events-backend/event`

Navigate to `/events-backend` folder\
Run `npm install` command to install all the necessary dependencies\
Run `npm start` to start the development server\
\
Navigate to `/events-frontend` folder\
Run `npm install` command to install all the necessary dependencies\
Run `npm run dev` command to start the development server\
\

With docker container up and both backend and frontend servers running, the whole application is ready for use.