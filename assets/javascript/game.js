$(document).ready(function() {
	//to do: attach character html representations to actual character objects i am dumb pls help 
	var luke = new character("Luke Skywalker", "luke-skywalker", 100, 8, 5);

	var obiWan = new character("Obi-Wan Kenobi", "obi-wan", 120, 8, 15);

	var darthMaul = new character("Darth Maul", "darth-maul", 200, 8, 25);

	var darthSidious = new character("Darth Sidious", "darth-sidious", 150, 8, 20);

	var characters = [luke, obiWan, darthMaul, darthSidious];
	var selections = 0; //to check for win condition
	var opponentSelect = false; //keeps track of status of game (character select, opponent select, etc)
	var defender;
	var player;
	var playerAP = 8;

	function character(name, id, hp, ap, counterAP) {
		this.name = name;
		this.id = id;
		this.HP = hp;
		this.AP = ap;
		this.counterAP = counterAP;

	}

	function placeCharacters() {
		for (i = 0; i < characters.length; i++) {
			var charDiv = $("<div>");
			charDiv.addClass("character-init")
			charDiv.attr("id", characters[i].id);
			charDiv.html(characters[i].name);
			charDiv.data("data-attr", {hp: characters[i].hp, ap: characters[i].ap, counterAP: characters[i].counterAP});
			// charDiv.attr("data-ap", characters[i].ap);
			// charDiv.attr("data-counterAP", characters[i].counterAP);
			console.log(charDiv);
			$("#characters-initial").append(charDiv);
		}
	}

	function transferDiv(obj, targetDiv) {
		obj.appendTo(targetDiv);

	}

	placeCharacters();


	
	$("#characters-initial").on("click", ".character-init", function(event) { 
		if (selections === 0 && !opponentSelect) {
			// "this" is the element the user clicked on??
			transferDiv($(this), $("#player-character"));
			$(this).removeClass("character-init").attr("id", "player");
			$("#characters-initial").children(".character-init").each(function () {
	 			// "this" is the current element in the loop
    			transferDiv($(this), $("#opponents"));
    			$(this).removeClass("character-init").addClass("opponent")
    			console.log($(this).attr("class"));
			});

			opponentSelect = true;
			selections++;
			player = $(this);
			console.log(opponentSelect);
			console.log(selections);

		} 
	});

	$("#opponents").on("click", ".opponent", function(event) {
		if (opponentSelect) {
			transferDiv($(this), $("#defender-div"));
			$(this).removeClass("opponent").attr("id", "defender");
			opponentSelect = false;
			selections++;
			console.log(opponentSelect);
			console.log(selections);
			$("#attack").prop('disabled', false);
			defender = $(this); 
			console.log(this);
		}

	});
	


	$("#attack").click(function (event) {
		$("#game-text").html("You attacked " + defender.text() + " for " + player.attr("data-ap")) ;

	});



})