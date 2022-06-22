# pocketMoney
## An implementation of Envelope Budgeting principles.

### Description
This is an exercise in writing an express back-end server along with a simple HTML/CSS/JS front-end.

Once server.js is running in node, navigate to localhost:3000 to begin using the program.

Three "envelopes" are pre-defined in the code. The buttons will contain the following functionality:
+ Show All Envelopes: Displays a list of all defined envelopes along with how full they are (expressed as currentValue/maxValue).
+ Change an Envelope: uses the values of the input fields to target an envelope and change the maximum budget, then displays all envelopes
+ Make a new Envelope: uses the values of the input fields to create a new envelope, then displays all envelopes.
+ Delete an Envelope: uses the values of the input fields to delete an envelope with the specified name, if it exists, then displays all envelopes.

I have elected to build a simple front-end for practice, rather than using the Postman application to handle my fetch requests.

The server uses several pre-defined middleware components for request parsing (body-parser), logging (morgan), and cross-origin requsts (cors), which will need to be installed locally if they are not already present on your system.

<br>

### Future extension ideas:
+ Utilize an actual Database for data storage and persistence between sessions.
+ Tune the front-end into something a little more user-friendly.

<hr>

### Original Project Briefing
For this project, you will build an API that allows clients to create and manage a personal budget. Using Envelope Budgeting principles, your API should allow users to manage budget envelopes and track the balance of each envelope. Your API should follow best practices regarding REST endpoint naming conventions, proper response codes, etc. Make sure to include data validation to ensure users do not overspend their budget!

Project Objectives:
   + Build an API using Node.js and Express
   + Be able to create, read, update, and delete envelopes
   + Create endpoint(s) to update envelope balances
   + Use Git version control to keep track of your work
   + Use the command line to navigate your files and folders
   + Use Postman to test API endpoints

Prerequisites:
   + Command line and file navigation
   + Javascript
   + Node.js
   + Express
   + Git and GitHub
   + Postman
