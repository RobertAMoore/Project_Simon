//Simon_ProofofConcept
//Bob Moore
//10 Rounds
//User must repeat pattern and reach final round to win

var readline = require('readline');

const lastRound = 10;
var simonArray = [];
var score = -1;

async function gameLoop(){
	for(var round = 0; round <= lastRound; round++){
		
		if (round == lastRound)
			console.log("You Win!");
		else{	
			simonArray[round] = Math.floor(Math.random()*4)+1;
			score++;
			
			for(var printi = 0; printi <= round; printi++){
				console.log(simonArray[printi]);
				
				/* Uncomment line below to put timer on pattern visibility. 
				 * Causes minor issues if player moves faster than timer.
				 * Pattern will otherwise disappear on first user input.*/
				//setTimeout(function(){pseudoClear()}, 3000);
				
				if (printi==round){
					for(var inputi = 0; inputi <= printi; inputi++){
						await readInput(inputi);
						pseudoClear();
					}
				}
			}
		}
	}
}

//Reads and Compares user input to simonArray. 
//Increases score if input and array element are equal, 
//ends game and displays score if they are not. 
function readInput(inputi) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question('', ans => {
				if (ans != simonArray[inputi]){
					console.log("You Lose");
					console.log("Score: " + score);
					rl.close();
				}
				else{
					rl.close();
					resolve(ans);
				}
    }))
}

//"Clears" console by printing blank lines
function pseudoClear(){
	var screenLines = process.stdout.getWindowSize()[1];
	
	for(var i = 0; i < screenLines; i++) {
    console.log('\r\n');
	}
};

console.log("Welcome to Simon");
console.log("BEGIN!");

//Begin Game
gameLoop();
