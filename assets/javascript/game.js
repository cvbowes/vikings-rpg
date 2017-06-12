$(document).ready(function() {
	var selections = 0; //to check for win condition
	var attacks = 0;	//to determine player AP
	var baseAP = 8;
	var opponentSelect = false; //keeps track of status of game (character select, opponent select, etc)
	var defender;
	var player;

	//to do: attach character html representations to actual character objects i am dumb pls help 
	var luke = new character("Luke Skywalker", "", 100, baseAP, 5);

	var obiWan = new character("Obi-Wan Kenobi", "", 120, baseAP, 15);

	var darthMaul = new character("Darth Maul", "", 200, baseAP, 25);

	var darthSidious = new character("Darth Sidious", "", 150, baseAP, 20);

	var characters = [luke, obiWan, darthMaul, darthSidious];
	

	function character(name, img, hp, ap, counterAP) {
		this.name = name;
		this.img = img;
		this.HP = hp;
		this.AP = ap;
		this.counterAP = counterAP;

	}

	function placeCharacters() {
		var charIndices = Object.keys(characters)
		for (i = 0; i < charIndices.length; i++) {
			var charIndex = charIndices[i];
			var character = characters[charIndex];		//allows us to reference characters array dynamically
			var charDiv = $("<div class = 'character-init' data-name = '" + charIndex + "'>");
			var charName = $("<div class = 'char-name'>");
			var charImg = $("<img class = 'char-img'>");
			var charHP = $("<div class = 'char-hp'>");

			charName.text(character.name);
			charImg.attr("src", character.img);
			charHP.text(character.HP);
			charDiv.append(charName).append(charImg).append(charHP);
			$("#characters-initial").append(charDiv);
		}
	}

	function playerAttack() {
		$("#game-text").html("You attacked " + defender.name + " for " + player.AP);
		defender.HP -= player.AP;
		$("#defender .char-hp").text(defender.HP);
		player.AP += baseAP;
		checkForWin();

	}

	function defenderAttack() {
		$("#game-text").append("<p>" + defender.name + " attacked you for " + defender.counterAP + "</p>");
		player.HP -= defender.counterAP;
		$("#player .char-hp").text(player.HP);
		checkForLose();
	}

	function checkForWin() {
		if (defender.HP <= 0) {
			
		}
	}

	function checkForLose() {
		return player.HP <= 0;
	}

	placeCharacters();


	
	$("#characters-initial").on("click", ".character-init", function(event) { 
		if (selections === 0 && !opponentSelect) {
			// "this" is the element the user clicked on
			var playerKey = $(this).attr("data-name");
			player = characters[playerKey];
			console.log("You have selected " + player.name);
			$(this).appendTo($("#player-character"));
			$(this).removeClass("character-init").attr("id", "player");
			$("#characters-initial").children(".character-init").each(function () {
	 			// "this" is the current element in the loop
	 			$(this).appendTo($("#opponents"));
    			$(this).removeClass("character-init").addClass("opponent")
			});

			opponentSelect = true;
			selections++;
		} 
	});

	$("#opponents").on("click", ".opponent", function(event) {
		if (opponentSelect) {
			var defenderKey = $(this).attr("data-name");
			defender = characters[defenderKey];
			console.log("Your opponent is " + defender.name);
			$(this).appendTo($("#defender-div"));
			$(this).removeClass("opponent").attr("id", "defender");


			opponentSelect = false;
			selections++;
			$('#attack').prop('disabled', false);
			console.log(opponentSelect);
			console.log(selections);

		}

	});
	


	$("#attack").click(function (event) {
		console.log(player);
		console.log(defender);
		playerAttack();
		defenderAttack();


	});



})