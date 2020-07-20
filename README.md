# MartianSlayers
Team repository for Microsoft's Mars Colonization Program for the final project. The project chosen is Tic-Tac-Toe.

## Getting Started

Before running this application, please ensure you have Node.js and NPM installed in your system. 
To install the dependencies for this application, open command line, change the directory to the project folder, and type:
```
npm install
```
This will install all the dependencies listed under the ‘dependencies’ section in package.json.
Once that is done, we can get the server up and running by typing the following in the command line:
```
node app.js
```
In the development phase, the package ‘nodemon’ was used. The command 
```
nodemon
```
can be used instead of node app.js. This package automatically restarts the server when changes are made to the JavaScript files
of the project, and on refreshing the page, the changes made to all files are implemented. This eliminates the need to repeatedly shut down and
restart server over and over again, which is required when using ```node``` to start the server.
To be able to use the command, type:
```
npm install -g nodemon
```
This adds ```nodemon``` to the system's PATH variables.

