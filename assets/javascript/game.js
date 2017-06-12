$(document).ready(function() {
	var selections = 0; //to check for win condition
	var attacks = 0;	//to determine player AP
	var baseAP = 8;
	var opponentSelect = false; //keeps track of status of game (character select, opponent select, etc)
	var defender, player, characters, luke, obiWan, darthMaul, darthSidious;	

	function character(name, img, hp, ap, counterAP) {
		this.name = name;
		this.img = img;
		this.HP = hp;
		this.AP = ap;
		this.counterAP = counterAP;
	}

	function gameSetup() {
		luke = new character("Luke Skywalker", "", 100, baseAP, 5);
		obiWan = new character("Obi-Wan Kenobi", "", 120, baseAP, 15);
		darthMaul = new character("Darth Maul", "", 200, baseAP, 25);
		darthSidious = new character("Darth Sidious", "", 150, baseAP, 20);
		characters = [luke, obiWan, darthMaul, darthSidious];

		placeCharacters();

	}

	function placeCharacters() {
		for (i = 0; i < characters.length; i++) {
			var character = characters[i];		//allows us to reference characters array dynamically
			var charDiv = $("<div class = 'character-init' data-name = '" + i + "'>");
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
			$('#attack').prop('disabled', true);
			if (selections === characters.length) {
				$("#game-text").empty();
				$("#game-text").html("<h3>You win!! Click 'Restart' to battle again.</h3>");
				$("#restart").show();
				return true;

			}	else {
				$("#game-text").empty();
				$("#game-text").html("<h3>You have defeated " + defender.name + "! Select your next opponent.</h3>")
				opponentSelect = true;
				return true;
			}

		}
		return false;
	}

	function checkForLose() {
		if (player.HP <= 0) {
			$('#attack').prop('disabled', true);
			$("#game-text").empty();
			$("#game-text").html("<h3>You have been defeated. ): <br/> Click 'Restart' to try again.</h3>")
			$("#restart").show();
		}
	}

	gameSetup();


	
	$("#characters-initial").on("click", ".character-init", function(event) { 
		if (selections === 0 && !opponentSelect) {
			// "this" is the element the user clicked on
			var playerKey = $(this).attr("data-name");
			player = characters[playerKey];
			$(this).appendTo($("#player-character"));
			$(this).removeClass("character-init").attr("id", "player");
			$("#characters-initial").children(".character-init").each(function () {
	 			// "this" is the current element in the loop
	 			$(this).appendTo($("#opponents"));
    			$(this).removeClass("character-init").addClass("opponent")
    		$("#characters-initial").hide();	

    		console.log("You have selected " + player.name);
			});

			opponentSelect = true;
			selections++;
		} 
	});

	$("#opponents").on("click", ".opponent", function(event) {
		if (opponentSelect) {
			$("#defender").remove();
			$("#game-text").empty();
			var defenderKey = $(this).attr("data-name");
			defender = characters[defenderKey];
			$(this).appendTo($("#defender-div"));
			$(this).removeClass("opponent").attr("id", "defender");

			console.log("Your opponent is " + defender.name);

			opponentSelect = false;
			selections++;
			$('#attack').prop('disabled', false);

		}

	});

	$("#attack").on("click", function(event) {
		playerAttack();
		if (!checkForWin()) {
			defenderAttack();
		}

	});

	$("#restart").on("click", function(event) {
		$(this).hide();
		$("#player").remove();
		$("#defender").remove();
		$("#opponents .opponent").empty();
		$("#game-text").empty();
		$("#characters-initial").show();

		selections = 0;
		attacks = 0;
		opponentSelect = false;

		gameSetup();




	});


})