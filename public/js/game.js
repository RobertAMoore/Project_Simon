/* game.js
 * Author: Bob Moore & Victoria Bloodgood
 * 
 * 20 Rounds
 * User must repeat pattern and reach final round to win
 * Speed increases by 1/10th of a second every 5 rounds.
 * 
 * CURRENT BUG: After first game it only accepts blue as the correct answer
 * WORK AROUND: Hid start button on game start and added reset button to reload page
 * */

var listenersActive;
var gameOver;

async function startGame(){
	const lastRound = 20;
	const colors = ["red","blue","green","yellow"];
	const GREEN = document.getElementById('green');
	const RED = document.getElementById('red');
	const YELLOW = document.getElementById('yellow');
	const BLUE = document.getElementById('blue');
	const roundCounter = document.getElementById('roundCounter');
	const startBtn = document.getElementById('start');
	
	var simonArray = [];
	var score = 0;
	var speed = 500; //Drop 100 every 5 rounds
	var iterator = 0;
	listenersActive = false;
	gameOver = false;
	
	//Button Listeners
	GREEN.addEventListener('click', () => {buttonHandler(GREEN, simonArray, iterator)}, false);
	RED.addEventListener('click', () => {buttonHandler(RED, simonArray, iterator)}, false);
	YELLOW.addEventListener('click', () => {buttonHandler(YELLOW, simonArray, iterator)}, false);
	BLUE.addEventListener('click', () => {buttonHandler(BLUE, simonArray, iterator)}, false);
	
	//Hide start button
	startBtn.style.display = "none";
	
	//Begin game loop
	for(var round = 0; round <= lastRound; round++){
		if (round == lastRound){
			score = round;
			sendScore(score);
		}
		else if (gameOver){
			sendScore(score);
			break;
		}
		else{
			simonArray[round] = colors[Math.floor(Math.random()*4)];
			score = round;
			roundCounter.innerHTML = round+1;  
						
			if ((round%5 == 0) && (round!=0)){
				speed = speed - 100;
			}
		
			for(var flash = 0; flash <= round; flash++){

				if (simonArray[flash] == "green"){
					await FlashButton(GREEN, speed, "#95cc83");
				}
				else if (simonArray[flash] == "red"){
					await FlashButton(RED, speed, "#f0a49e");
				}
				else if (simonArray[flash] == "yellow"){
					await FlashButton(YELLOW, speed, "#d7e394");
				}
				else if (simonArray[flash] == "blue"){
					await FlashButton(BLUE, speed, "#a2a8fc");
				}
				
				if (flash == round){
					roundCounter.style.color = 'green';
					for (var i = 0; i <= flash; i++){
						listenersActive = true;
						iterator = i;
						while (listenersActive){
							await new Promise(resolve => setTimeout(resolve, 1));
						}
						
						if (gameOver){
							roundCounter.style.color = 'red';
							break;
						}
						else if (i==flash){
							roundCounter.style.color = 'red';
							await new Promise(resolve => setTimeout(resolve, 1000)); //Wait for one second before next round starts
						}						
					}
				}
			}
		}
	}
}

//Compares the button pressed to the current color in 
//the simonArray sequence if listenersActive is true. 
//Turns Listeners off on exit
//@param	button - which color tile was pressed
//@param	simonArray - The simonArray sequence to be compared to
//@param	iterator - Which step of the sequence to test
function buttonHandler(button, simonArray, iterator){
		if (listenersActive){
			FlashButton(button, 300, "gray");
			if (button.id != simonArray[iterator]){                         
				gameOver = true;
			}	
		}
		listenersActive = false;
}

//Temporarily changes color of button for specified length of time
//@param button - which color tile to flash 
//@param speed - Duration of button flash
//@param color - The color the button will flash
async function FlashButton(button, speed, color){
	play_audio(button.id);
	button.style.backgroundColor= color; 
	await new Promise(resolve => setTimeout(resolve, speed));
	button.style.backgroundColor=button.id; //Original color
	await new Promise(resolve => setTimeout(resolve, speed));
}

//Plays specific audio file depending on event
//@param arg- event that calls audio
function play_audio(arg){
	switch(arg){
		case "red":
			new Audio('/public/audio/ding3.wav').play();
		break;
		case "green":
			new Audio('/public/audio/ding2.wav').play();
		break;
		case "blue":
			new Audio('/public/audio/newding.wav').play();
		break;
		case "yellow":
			new Audio('/public/audio/ding4.wav').play();
		break;
		case "gameover":
			new Audio('/public/audio/gameover.mp3').play();
		break;
		case "won":
			new Audio('/public/audio/dingwon.wav').play();
		break;
	}
}

//Send Score Request to server
//@param score - score that user just recieved
//Response returns true if score is user's new highscore
function sendScore(score){
	const URL = 'http://localhost:8080/user/newScore';
	$.post(URL,{score: score}, function (response, status){
		console.log(response + ' and status is ' + status);
		
		let message = document.getElementById("Message");
		
		if (score == 20){
			play_audio('won');
			message.style.color = 'green';
			message.innerHTML = "YOU WON!";
		}
		else if (response){
			play_audio('won');
			message.style.color = 'green';
			message.innerHTML = "NEW HIGHSCORE!: " + score;
		}
		else{
			play_audio('gameover');
			message.style.color = 'red';
			message.innerHTML = "GAMEOVER- Score: " + score;
		}
	});
}
