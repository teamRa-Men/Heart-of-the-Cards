
var fhRef = firebase.database().ref("cards").orderByKey();
//html elements
var deckTable = document.getElementById("decks");
var hand = document.getElementById("hand");

var decks = [];

function addNewDeck(){
	decks.push(new Deck());
}

/*
function save(){
	console.log("saving to database");
	for(var i = 0; i < decks.length; i++){
		var cards = decks[i].cards;
		for(var j = 0; j < cards.length;j++){
			updateCardData(cards[j]);
		}
	}
}*/

function load(){

}

class Deck {

	

	constructor(){

		var cards = [];
		

		var deckRow = document.createElement("tr");
		
		
		var deckCell = document.createElement("td");
		deckCell.className = "card";

		var deckInput = document.createElement("INPUT");
		deckInput.className="textInput";
		deckInput.placeholder = "question " + decks.length;

		deckInput.onkeyup = function(event){
			event.preventDefault();
    		if (event.keyCode === 13) {
        		console.log("enter key pressed");
        		updateDeckData(deck);	
    		}
		}


		deckCell.appendChild(deckInput);
		deckRow.appendChild(deckCell);
		deckTable.appendChild(deckRow);

		var deck = this;
		this.deckRow = deckRow;
		this.text = deckInput;
		this.key = addDeckData(this);


		var buttons = document.createElement("div");
	
		var addCardButton = document.createElement("INPUT");
		addCardButton.type = "button";
		addCardButton.value = "add";

		addCardButton.onclick = function(){
			var newCard =  new Card(deck);
			
			cards.push(newCard);
			console.log(cards);
			newCard.text.placeholder = "option " + cards.length ;
		}

		var deleteButton = document.createElement("INPUT");
		deleteButton.type = "button";
		deleteButton.value = "trash";
		deleteButton.onclick = function(){
			deckTable.removeChild(deckRow);
			deleteDeckData(deck);
		}

		var drawButton = document.createElement("INPUT");
		drawButton.type = "button";
		drawButton.value = "draw";
		drawButton.onclick = function(){
			var index = Math.floor(cards.length*Math.random());
			new DrawnCard(this,cards[index]);
		}

		
		buttons.appendChild(deleteButton);
		buttons.appendChild(addCardButton);
		buttons.appendChild(drawButton);
		deckCell.appendChild(buttons);


	}
}

class Card {

	constructor(deck){

		this.deck = deck;
		console.log(deck.key +"  from card");
		
		var cardInput = document.createElement("INPUT");
		cardInput.className="textInput";
		cardInput.type = "text";
		

		
		var cardCell = document.createElement("td");
		cardCell.className = "card";
		cardCell.appendChild(cardInput);
		deck.deckRow.appendChild(cardCell);

		var deleteCard = document.createElement("INPUT");
		deleteCard.type = "button";
		deleteCard.value = "trash";
		cardCell.appendChild(deleteCard);

		this.text = cardInput;
		this.key = addCardData(this);
		console.log(this.key);
		var card = this;


		deleteCard.onclick = function(){

			deleteCard.parentNode.remove();
			deleteCardData(card);

		}



		cardInput.onkeyup = function(event){
			event.preventDefault();
    		if (event.keyCode === 13) {
        		console.log("enter key pressed");
        		updateCardData(card);	
    		}
		}
	
	}

	
}

class DrawnCard {

	constructor(deck, card){
		var drawnCard = document.createElement("td");
		drawnCard.className = "card";

		var text = card.text.value;
		if(text == ""){
			text = card.text.placeholder;
		}
		drawnCard.appendChild(document.createTextNode(text));

		var discard = document.createElement("INPUT");
		discard.type = "button";
		discard.value = "discard";
		drawnCard.appendChild(discard);

		discard.onclick = function(){

			discard.parentNode.remove();
		}
		hand.appendChild(drawnCard);
	}
}




/*
fhRef.once("value").then(function (snapshot) {
 snapshot.forEach(function (childSnapshot) {
 var key=childSnapshot.key;

 var childData = childSnapshot.val();
 var data = childSnapshot.val();
 // console.log(data.company);
 var row = document.createElement("tr");
 var td1 = document.createElement('td');
 var td2 = document.createElement('td');

 options.push(data.text);
 td1.appendChild(document.createTextNode(data.text));

 var removeBtn = document.createElement("button");
 removeBtn.id = key+"";
 removeBtn.innerHTML = 'remove ' + key;
 
 removeBtn.onclick = function(){
 	console.log(removeBtn.id);
 	snapshot.forEach(function (child) {
 		var childKey =child.key;
 		if(key === childKey){
 			child.getRef().remove();
 			console.log(childKey + "remove");

 			const i = options.indexOf(child.val().text);
			if (i > -1) {
  				options.splice(i, 1);
			}
 		}
 	});


 	removeBtn.remove();
 	td1.remove();
 	row.remove();
	
 }

 td2.appendChild(removeBtn);

 row.appendChild(td1);
 row.appendChild(td2);

 tblBody.appendChild(row);
 });
});
tbl.appendChild(tblBody);
body.appendChild(tbl);

function drawCard(){
	if(options.length > 0){
		var draw = Math.floor(Math.random()*options.length);
		console.log(draw + " " + options[draw]);
		document.getElementById("drawn_card").innerHTML = options[draw];
	}
	else{
			document.getElementById("drawn_card").innerHTML = "<br>";
	 }
 }
*/
