Disclaimer: We do not own the rights of Simon, all rights reserved to Hasbro, Inc.
________________

Project_Simon
________________

Clone of Simon Memory Game by Hasbro, Inc.
Create/save users
Saves highscores and displays top 5 users

________________

Dependencies
________________

MongoDB
Mongoose
express
express-session
bodyParser
path
pug
JQuery 

________________

Installation/Execution Instructions
________________

https://github.com/RobertAMoore/Project_Simon

Make sure mongodb is running as a service with an instance of simonDB. 
Install all dependencies from our dependency list above. While in 
Project_Simon directory run 'node app.js'. Direct your browser to the url 
specified in the console.

(If running on a remote server appropriately change url in app.js and the 
‘sendScore’ function of game.js)

Once the game is displayed, create a login with any username and password.
Sign in using the same username and password.

To turn the server off Press Ctrl+C in the console.

________________

Simon_Project Architecture
________________

Models- Database model and Query functions
Public- Frontend assets and game logic
Routes- Listens and handles http requests
Views- Template files


*****************************************************************
Written by Hamza Abdulhaqq and Victoria Bloodgood - 12/14/2020

Project Contributors:
	Bob Moore
	Rick Roberts
	Sean Barrett
	Victoria Bloodgood
	Hamza Abdulhaqq
