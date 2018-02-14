# massdrop-coding-challenge

### Goal:
Create a job queue whose workers fetch data from a URL and store the results in a database. The job queue should expose a REST API for adding jobs and checking their status / results.

Example:

User submits www.google.com to your endpoint. The user gets back a job id. Your system fetches www.google.com (the result of which would be HTML) and stores the result. The user asks for the status of the job id and if the job is complete, he gets a response that includes the HTML for www.google.com.

### Result:
For this project I chose to use express.js for the API and mongodb as the database. This API takes the calls made to the endpoint /websites as {content: "http://www.google.com"}, then uses request to scrap the html of the website sent, then saves the website to the database.


## In order to run project:
* run redis server- redis-server
* run MongoDB- mongod --dbpath mongodb/
* run server- node server.js
