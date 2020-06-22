
var user = "";
var decks = [];

//html elements
var deckTable = document.getElementById("decks");
var hand = document.getElementById("hand");
var deckList = document.getElementById("deckList");

var cardTable = document.getElementById("card_table");
cardTable.style.display = "none";
//cardTable.style.display = "block";
login_registration.style.display = "block";
//login_registration.style.display = "none";

function loggedOut(){
	user = "";
	login_registration.style.display = "block";
	cardTable.style.display = "none";
}

function loggedIn(userId){
	login_registration.style.display = "none";
	user = userId;
	userRef = firebase.database().ref("/"+userId);

	readUser(userRef);
	cardTable.style.display = "block";

}

function readUser(userRef){
	userRef.once("value").then(function (snapshot) {
 	snapshot.forEach(function (childSnapshot) {
 		var key=childSnapshot.key;
		var data = childSnapshot.val();
		var deckRef = firebase.database().ref(user+"/"+key).orderByKey();
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
		if(decks.length>0){
			d.deckRow.style.display = "none";
			d.cardContainer.style.display = "none";
		}
		else{
			d.deckRow.style.display = "block";
			d.cardContainer.style.display = "block";
		}
		
		decks.push(d);

		

	});	
}

function readCard(card, deckKey, key){
	var cardRef = firebase.database().ref("user/"+deckKey+"/"+key).orderByKey();
	
	downloadCardImage(key, card);

	cardRef.once("value").then(function (snapshot) {
		snapshot.forEach(function (childSnapshot) {

 			var childkey=childSnapshot.key;
 			var key = snapshot.key;

			var data = childSnapshot.val();
			

			if(childkey == "cardtext"){
				card.text.value = data;
			}
			/*
			if(childkey == "drawn"){
				card.drawn = data;		

				if(card.drawn == "true"){
					new DrawnCard(card.deck, card);
					card.image.style.opacity = 0.2;
					card.cardObject.className = "cardDrawn";
				}
			}*/
			
		})
	});

	

	
}




function addNewDeck(){
	decks.push(new Deck());
}



class Deck {
	constructor(key,textValue,cardKeys){

		var deckRow = document.createElement("tr");	
		
		this.deckRow = deckRow;

		var deckCell = document.createElement("td");
		deckCell.className = "cell";
		var deckObject = document.createElement("div");
		deckObject.className = "deck";
		

		var deckInput = document.createElement("INPUT");
		deckInput.className="textInput";
		deckInput.placeholder = "unamed card " + decks.length;

		
		var addCardButton = document.createElement("INPUT");
		addCardButton.type = "button";
		addCardButton.value = "add card";
		addCardButton.className = "button";

		var deleteButton = document.createElement("INPUT");
		deleteButton.type = "button";
		deleteButton.value = "x";
		deleteButton.className = "deleteDeckButton";
		
		var drawButton = document.createElement("INPUT");
		drawButton.type = "button";
		drawButton.value = "draw card";
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
		

		var cardContainerCell = document.createElement("td");
		 
		
		var cardContainer = document.createElement("div");
		cardContainerCell.appendChild(cardContainer);
		cardContainerCell.className = "cell";

		cardContainer.className = "cardContainer";

		deckRow.appendChild(cardContainerCell);

		this.cardContainer = cardContainer;


		var cards = [];
		
		
		this.cards = cards;
		var deck = this;
		this.deckRow = deckRow;
		this.text = deckInput;
		this.deckRow = deckRow;
		
		
		this.key = key;
		if(!key){
			this.key = addDeckData(this,user);
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
        		updateDeckData(deck,user);
        		
        		deckListText.value = "" + deckInput.value;
    		}	
		}

		addCardButton.onclick = function(){
			var newCard =  new Card(deck);
			cards.push(newCard);
			
			newCard.text.placeholder = "unamed card " + cards.length;
		}

		deleteButton.onclick = function(){
			deckTable.removeChild(deckRow);
			deckList.removeChild(deckListCell);
			deleteDeckData(deck,user);

		}
		
		drawButton.onclick = function(){
			if(cards.length > 0){
				var index = Math.floor(cards.length*Math.random());
				cards[index].drawn = "true";
				
				cards[index].undrawnCard = new DrawnCard(this,cards[index]);
				cards[index].image.style.opacity = 0.2;
				cards[index].cardObject.className = "cardDrawn";
				cards.splice(index,1);
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
		deleteCard.className = "deleteCardButton";

		var imageUpload = document.createElement("INPUT");
		imageUpload.type = "file";
		imageUpload.id = "image" + key;
		//imageUpload.className = "button";
		imageUpload.style.width="90px";

		var inputLabel = document.createElement("LABEL");
		inputLabel.htmlFor = imageUpload;
		inputLabel.innerHTML = "choose image";
		inputLabel.className = "button";
		imageUpload.appendChild(inputLabel);
		

		

	

		var upload = document.createElement("INPUT");
		upload.type = "button";
		upload.value = "apply image";	
		upload.className = "button";

		var imageObject = document.createElement("img");
		imageObject.className = "cardImage";

		cardObject.appendChild(cardInput);
		cardObject.appendChild(imageObject);

		cardCell.appendChild(deleteCard);

		cardCell.appendChild(cardObject);
		cardCell.appendChild(imageUpload);
		cardCell.appendChild(upload);
		
		deck.cardContainer.appendChild(cardCell);
		
		


		this.cardObject = cardObject;

		this.deck = deck;
		this.text = cardInput;
		this.key = key;
		this.drawn = "false";
		this.image = imageObject;
		this.undrawn = null;
		if(!key){
			this.key = addCardData(this,user);
		}
		else{
			readCard(this,deck.key, key);
		}
		console.log(this.drawn + " sfdssdfasdfsdfsdf");


		var card = this;


		deleteCard.onclick = function(){
			deleteCard.parentNode.remove();
			deleteCardData(card);
			var index = deck.cards.indexOf(this);
			var undrawnIndex = deck.cards.indexOf(this);
			card.parentNode.remove();
			if(this.undrawn){
				this.undrawn.remove();
			}

			deck.cards.splice(index,1);
			
		}

		cardInput.onkeyup = function(event){
			event.preventDefault();
    		if (event.keyCode === 13) {
        		updateCardData(card,user);	
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
		drawnCardCell.className = "cell";
		drawnCard.className = "card";

		var text = card.text.value;
		if(text == ""){
			text = card.text.placeholder;
		}


		
		var drawnCardText = document.createTextNode(text);
		var textContainer = document.createElement("span");
		textContainer.appendChild(drawnCardText);
		textContainer.className = "textInput";
		drawnCard.appendChild(textContainer);

		var showImage =document.createElement("img")
		showImage.src = card.image.src;
		showImage.className = "cardImage";
		drawnCard.appendChild(showImage);
		console.log(card.image.src.length + " ");
		if(card.image.src.length  > 0){
			showImage.style.display = "block";
		}
		else {
			showImage.style.display = "none";
		}


		drawnCardCell.appendChild(drawnCard);

		var discard = document.createElement("INPUT");
		discard.type = "button";
		discard.value = "discard";
		discard.className="button";
		drawnCardCell.appendChild(discard);

		hand.appendChild(drawnCardCell);

		discard.onclick = function(){
			
			card.drawn = "false";
			
					
			card.deck.cards.push(card);
			card.cardObject.className = "card";
			card.image.style.opacity = 1;
			
			discard.parentNode.remove();

		}
		
	}

}



