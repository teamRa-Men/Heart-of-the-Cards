
var fhRef = firebase.database().ref("user").orderByKey();
readUser(fhRef);

var decks = [];

function readUser(userRef){
	userRef.once("value").then(function (snapshot) {
 	snapshot.forEach(function (childSnapshot) {
 		var key=childSnapshot.key;
		var data = childSnapshot.val();
		var deckRef = firebase.database().ref("user/"+key).orderByKey();
		readDeck(deckRef);

		})
	});
}

function readDeck(deckRef){
    deckRef.once("value").then(function (snapshot) {
    	var key = snapshot.key;
		var deckText = "";
		var cardKeys = [];

 		snapshot.forEach(function (childSnapshot) {
			var childkey=childSnapshot.key;
			var data = childSnapshot.val();

			if(childkey == "decktext"){
				deckText = data;
			
			}
			else{
				cardKeys.push(childkey);
			}
		});
		var d = new Deck(key,deckText,cardKeys);
		decks.push(d);

	});	
}

function readCard(card, deckKey, key){
	var cardRef = firebase.database().ref("user/"+deckKey+"/"+key).orderByKey();
	cardRef.once("value").then(function (snapshot) {
		snapshot.forEach(function (childSnapshot) {

 			var childkey=childSnapshot.key;
 			var key = snapshot.key;

			var data = childSnapshot.val();


			if(childkey == "cardtext"){
				card.text.value = data;
			}
			if(childkey == "drawn"){
				card.drawn = data;
				if(data == "true"){
					new DrawnCard(card.deck, card);
					card.cardObject.className = "cardDrawn";
				}
				else{
					card.deck.undrawn.push(card);
				}
			}
			
		})
	});
}

//html elements
var deckTable = document.getElementById("decks");
var hand = document.getElementById("hand");
var deckList = document.getElementById("deckList");


function addNewDeck(){
	decks.push(new Deck());
}


class Deck {
	constructor(key,textValue,cardKeys){

		var deckRow = document.createElement("tr");	
		deckRow.style.display = "none";

		var deckCell = document.createElement("td");
		deckCell.className = "cell";
		var deckObject = document.createElement("div");
		deckObject.className = "deck";
		

		var deckInput = document.createElement("INPUT");
		deckInput.className="textInput";
		deckInput.placeholder = "question " + decks.length;

		
		var addCardButton = document.createElement("INPUT");
		addCardButton.type = "button";
		addCardButton.value = "add";
		addCardButton.className = "button";;

		var deleteButton = document.createElement("INPUT");
		deleteButton.type = "button";
		deleteButton.value = "x";
		deleteButton.className = "deleteButton";
		
		var drawButton = document.createElement("INPUT");
		drawButton.type = "button";
		drawButton.value = "draw";
		drawButton.className = "button";

		var deckListCell = document.createElement("div");
		
		var deckListText = document.createElement("INPUT");
		deckListText.type = "button";
		deckListText.value = "unamed deck"
		deckListText.className = "button";

		deckListCell.appendChild(deckListText);
		deckListCell.appendChild(deleteButton);
		deckList.appendChild(deckListCell);

		deckObject.appendChild(deckInput);
		deckCell.appendChild(deckObject);
		deckRow.appendChild(deckCell);
		deckTable.appendChild(deckRow);

		
		deckCell.appendChild(addCardButton);
		deckCell.appendChild(drawButton);
		

		var cards = [];
		var undrawn = [];
		this.undrawn = undrawn;
		this.cards = cards;
		var deck = this;
		this.deckRow = deckRow;
		this.text = deckInput;
		this.deckRow = deckRow;
		
		this.key = key;
		if(!key){
			this.key = addDeckData(this);
		}
		else if(cardKeys){
			this.text.value = textValue;
			for(var i = 0; i < cardKeys.length; i++){
				var oldCard =  new Card(deck,cardKeys[i]);
				cards.push(oldCard);
			}
		}



		deckInput.onkeyup = function(event){
			event.preventDefault();
    		if (event.keyCode === 13) {
        		updateDeckData(deck);
        		
        		deckListText.value = "" + deckInput.value;
    		}	
		}

		addCardButton.onclick = function(){
			var newCard =  new Card(deck);
			cards.push(newCard);
			undrawn.push(newCard);
			newCard.text.placeholder = "unamed card " + decks.length;
		}

		deleteButton.onclick = function(){
			deckTable.removeChild(deckRow);
			deckList.removeChild(deckListCell);
			deleteDeckData(deck);

		}
		
		drawButton.onclick = function(){
			if(undrawn.length > 0){
				var index = Math.floor(undrawn.length*Math.random());
				undrawn[index].drawn = "true";
				updateCardData(undrawn[index]);
				undrawn[index].undrawnCard = new DrawnCard(this,undrawn[index]);
				undrawn[index].cardObject.className = "cardDrawn";
				undrawn.splice(index,1);
			}
			else{
				console.log("all drawn");
			}
		}	

		deckListText.onclick = function(){
			for(var i = 0; i < decks.length; i++){
				decks[i].deckRow.style.display = "none";
			}
			deckRow.style.display = "block";

			
		}
	}
}



class Card {

	constructor(deck, key){

		var cardInput = document.createElement("INPUT");
		cardInput.className="textInput";
		cardInput.type = "text";
		cardInput.placeholder = "unamed card " + deck.cards.length;

		var cardCell = document.createElement("td");
		cardCell.className = "cell";

		var cardObject = document.createElement("div")
		cardObject.className = "card";
		

		var deleteCard = document.createElement("INPUT");
		deleteCard.type = "button";
		deleteCard.value = "x";	
		deleteCard.className = "deleteButton";

		var imageUpload = document.createElement("INPUT");
		imageUpload.type = "file";
		imageUpload.id = "image" + key;
		imageUpload.style.width="90px";


	

		var upload = document.createElement("INPUT");
		upload.type = "button";
		upload.value = "upload";	
		upload.className = "button";

		var imageObject = document.createElement("img");
		imageObject.className = "cardImage";

		cardObject.appendChild(cardInput);
		cardObject.appendChild(imageObject);

		cardCell.appendChild(deleteCard);

		cardCell.appendChild(cardObject);
		cardCell.appendChild(imageUpload);
		cardCell.appendChild(upload);
		
		deck.deckRow.appendChild(cardCell);
		
		


		this.cardObject = cardObject;

		this.deck = deck;
		this.text = cardInput;
		this.key = key;
		this.drawn = "false";
		this.image = imageObject;
		if(!key){
			this.key = addCardData(this);
		}
		else{
			readCard(this,deck.key, key, imageObject);
		}
		var card = this;


		deleteCard.onclick = function(){
			deleteCard.parentNode.remove();
			deleteCardData(card);
			var index = deck.cards.indexOf(this);
			var undrawnIndex = deck.undrawn.indexOf(this);

			deck.cards.splice(index,1);
			deck.undrawn.splice(undrawnIndex,1);
		}

		cardInput.onkeyup = function(event){
			event.preventDefault();
    		if (event.keyCode === 13) {
        		updateCardData(card);	
    		}
		}	
		upload.onclick = function(event){
			uploadCardImage(imageUpload.files[0],key, imageObject );
			imageObject.style.display="block";
		}
	}	
}

class DrawnCard {

	constructor(deck, card){
		this.card = card;

		var drawnCardCell = document.createElement("td");
		var drawnCard = document.createElement("div");
		
		drawnCard.className = "card";

		var text = card.text.value;
		if(text == ""){
			text = card.text.placeholder;
		}

		var image = card.image;

		
		var drawnCardText = document.createTextNode(text);
		var textContainer = document.createElement("span");
		textContainer.appendChild(drawnCardText);
		textContainer.className = "textInput";
		drawnCard.appendChild(textContainer);

		var showImage =document.createElement("img")
		showImage.src = image.src;
		showImage.className = "cardImage";
		drawnCard.appendChild(showImage);


		drawnCardCell.appendChild(drawnCard);

		var discard = document.createElement("INPUT");
		discard.type = "button";
		discard.value = "discard";
		discard.className="button";
		drawnCardCell.appendChild(discard);

		hand.appendChild(drawnCardCell);

		discard.onclick = function(){
			var index = card.deck.cards.indexOf(card);
			card.drawn = "false";
			card.cardObject.className = "card";
			if(index >-1){			
				card.deck.undrawn.push(card);
				updateCardData(card);
			}
			discard.parentNode.remove();
			

		}
		
	}

}



