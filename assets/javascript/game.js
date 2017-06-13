$(document).ready(function() {
	var selections = 0; //to check for win condition
	var attacks = 0;	//to determine player AP
	var baseAP = 8;
	var opponentSelect = false; //keeps track of status of game (character select, opponent select, etc)
	var defender, player, characters, ragnar, lagertha, athelstan, floki, rollo, bjorn, jarlBorg, ecbert;	

	function character(name, img, hp, ap, counterAP) {
		this.name = name;
		this.img = img;
		this.HP = hp;
		this.AP = ap;
		this.counterAP = counterAP;
	}

	function gameSetup() {
		ragnar = new character("Ragnar", "assets/images/ragnar.jpg", 180, baseAP, 20);
		lagertha = new character("Lagertha", "assets/images/lagertha.jpg", 150, baseAP, 15);
		athelstan = new character("Athelstan", "assets/images/athelstan.jpg", 120, baseAP, 5);
		floki = new character("Floki", "assets/images/floki.jpg", 150, baseAP, 20);
		rollo = new character("Rollo", "assets/images/rollo.jpg", 200, baseAP, 25);
		bjorn = new character("Bjorn", "assets/images/bjorn.jpg", 130, baseAP, 10);
		jarlBorg = new character("Jarl Borg", "assets/images/jarlborg.jpg", 180, baseAP, 18);
		ecbert = new character("King Ecbert", "assets/images/ecbert.jpg", 150, baseAP, 10);

		characters = [ragnar, lagertha, athelstan, floki, rollo, bjorn, jarlBorg, ecbert];

		placeCharacters();

	}

	function placeCharacters() {
		for (i = 0; i < characters.length; i++) {
			var character = characters[i];		//allows us to reference characters array dynamically
			var charDiv = $("<div class = 'character-init' data-name = '" + i + "'>");
			var charImg = $("<div class = 'img-div'>");
			var charName = $("<div class = 'char-name'>");
			var charHP = $("<div class = 'char-hp'>");

			charImg.html("<img class='char-img' src=" + character.img + ">");
			charName.text(character.name);
			charHP.text(character.HP);
			charDiv.append(charImg).append(charName).append(charHP);
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
			var playerIndex = $(this).attr("data-name");
			player = characters[playerIndex];
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