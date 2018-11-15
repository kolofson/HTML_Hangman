// JavaScript Document
var originalWord, hiddenWord, chances;
var usedLetters = [];

function getWord() {
	
	"use strict";
	
	var words = ["lightsaber", "university", "headphones", "keyboard", "archived", "telephone"];
	
	var i = (Math.floor(Math.random() * words.length));
	originalWord = words[i];
	hiddenWord = originalWord;
	
	for (var x = 0; x < hiddenWord.length; x++) {
		
		var index = hiddenWord.charAt(x);
		hiddenWord = hiddenWord.replace(index, "_");
		
	}
	
	document.getElementById("hiddenWord").innerHTML = hiddenWord;

	startGame();
}

function startGame() {
	
	"use strict";
	
	//JQUERY
	
	//disable button temp so cant spawn more boxes
	$("input").attr("disabled", true);
	chances = 5;
	
	$("<input id='userinput'>").insertAfter("input").css("margin-top", "20px").attr("id", "userInput");
	$("<button>SUBMIT</button>").insertAfter("#userInput").css("margin-top", "20px").attr("onClick", "submitGuess()");
	$("<br>").insertAfter("input");
	$("<h4></h4>").insertAfter("h1").attr("id", "lives").css("float", "left").html("Chances:<br>" + chances);
	$("<h4></h4>").insertAfter("h1").attr("id", "letters").css("float", "right").html("Letters Used:<br>" + usedLetters);
	
		
}

function setCharAt(str,index,chr) {
	
	"use strict"; 
	
	if (index > str.length - 1){
		
		return str;
		
	} 
	
	return str.substr(0, index) + chr + str.substr(index + 1);
}

function submitGuess() {
	
	"use strict";
	$("h2").remove();
	
	var playerGuess = document.getElementById("userInput").value;
	document.getElementById("userInput").value = "";
	
	if (chances === 0) {
		
		$("<h2>Game Over</h2>").insertAfter("#start");
		
	}
	
	if (playerGuess.length > 1) {
		
		$("<h2>Try a Letter</h2>").insertAfter("#start");
		
	}
	
	else {
		
		if (originalWord.includes(playerGuess)) {
			
			$("<h2>Nice!</h2>").insertAfter("#start");
			
			for (var i = 0; i < originalWord.length; i++) {
				
				if (originalWord[i] === playerGuess) {
					
					var reveal = originalWord.charAt(i);
					//replace index with correct letter
				
					hiddenWord = setCharAt(hiddenWord, i, reveal);
					
				}
				
				else {
					
					continue;
				}
				
			} //end of loop
			
			document.getElementById("hiddenWord").innerHTML = hiddenWord;
			
		}
		
		else {
			
			chances--;
			usedLetters.unshift(playerGuess);
			$("<h2>Sorry!</h2>").insertAfter("#start");		
			
		}
		
	}
	
	//update 
	$("#letters").html("Letters Used:<br>" + usedLetters);
	$("#lives").html("Chances:<br>" + chances);
	
	if (chances === 0) {
		
		$("#userInput").attr("disabled", "true");
		$("h2").html("GAME OVER");
		
	} 
	
}

