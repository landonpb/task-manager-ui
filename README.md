## Objectives
* View tasks
* Add a task (title-only is acceptable)
* Mark a task as done

## Requirements
* Typescript React
* Use Axios to interact with the API
* Keep UI code minimal and functional

## To Build
To build the application we can use either of the below commands:
* Using Dockerfile: `docker build -t taskmanager-ui .`
* Using compose: `docker-compose build`

## To Run
To run the application we can use either of the below commands:
* Using Dockerfile: `docker run -p 3000:3000 taskmanager-ui`
* Using compose: `docker-compose up -d`

## View
Navigate to `localhost:3000` in your browser (NOTE: taskmanager backend application needs to be running first).
All CRUD functionality should work as expected, and there should initially be 2 records already pre-populated on the UI.