# node-server

a simple node server

## Getting Started

1. change directory to node-server folder

2. run
```
npm install
```
to install the node packages.

3. run
```
node index
```
to start node server listening on port 8765.

### Prerequisites

node v10.15.3 or above

#### functionality

This server provides a restful api with POST method and "/checkBirthday" url to check how many days from today to the next birthday. The input format is json passed in body and requires 4 properties: firstName, lastName, month, date. 
