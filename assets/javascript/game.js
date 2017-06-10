$(document).ready(function() {
	var luke = {
		name: "Luke Skywalker",
		id: "luke-skywalker",
		HP: 100,
		AP: 8,
		counterAP: 5
	};

	var obiWan= {
		name: "Obi-Wan Kenobi",
		id: "obi-wan",
		HP: 120,
		AP: 8,
		counterAP: 15
	};

	var darthMaul= {
		name: "Darth Maul",
		id: "darth-maul",
		HP: 200,
		AP: 8,
		counterAP: 25
	};

	var darthSidious= {
		name: "Darth Sidious",
		id: "darth-sidious",
		HP: 150,
		AP: 8,
		counterAP: 20
	};

	var characters = [luke, obiWan, darthMaul, darthSidious];
	var clickSelects = 0; //keeps track of status of game (character select, opponent select, etc)
	var opponentSelect = false;

	function placeCharacters() {
		for (i = 0; i < characters.length; i++) {
			var charDiv = $("<div>");
			charDiv.addClass("character")
			charDiv.attr('id', characters[i].id);
			charDiv.html(characters[i].name);
			$("#characters-initial").append(charDiv);
		}
	}

	function transferDiv(obj, targetDiv) {
		obj.appendTo(targetDiv);

	}

	placeCharacters();


	
	$(".character").click(function(event) { 
		if (clickSelects === 0 && !opponentSelect) {
			// "this" is the element the user clicked on
			transferDiv($(this), $("#player-character"));
			$("#characters-initial").children(".character").each(function () {
	 			// "this" is the current element in the loop
    			transferDiv($(this), $("#opponents"));
    			$(this).removeClass("character").addClass("enemy");
    			console.log($(this).attr('class'));

			});

			opponentSelect = true;

			clickSelects++;
			console.log(opponentSelect);
			console.log(clickSelects);
		}
		});

	$(".enemy").click(function(event) {
		if (clickSelects > 0 && clickSelects < characters.length && opponentSelect) {
			console.log(opponentSelect);
			transferDiv($(this), $("#defender"));
			opponentSelect = false;
			clickSelects++;
			console.log(opponentSelect);
			console.log(clickSelects);
		} else {
			console.log("lol u r stupid");
		}
		});

})