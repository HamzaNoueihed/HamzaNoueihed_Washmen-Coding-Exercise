
# Running the Application with 

# Docker Build

1.Run:

docker build -t nginx-angular -f nginx.dockerfile .
docker run -p 80:80 nginx-angular

2. Go to http://localhost:8080 in your browser 

## Docker Compose

1.Run:

 docker-compose build
 docker-compose up
 
2. Go to http://localhost:8080 in your browser 


## Node.js

1. Run:

 npm install
 ng build --watch

2. In a separate terminal, run `npm start` 

3. Go to http://localhost:8080 in your browser 
