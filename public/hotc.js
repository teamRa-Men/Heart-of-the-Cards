
var user = "";
var decks = [];
var handCards = [];


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
	for(var i = 0; i < decks.length; i++){
		decks[i].deckRow.remove();
		decks[i].deckListCell.remove();
		decks[i].deckObject.remove();
	}
	decks = [];
	for(var i = 0; i < handCards.length; i++){
		handCards[i].cell.remove();
		handCards[i].cardObject.remove();
	}
	handCards = [];
	cardTable.style.display = "none";



}

function loggedIn(userId){
	handCards = [];

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

		


		
		decks.push(d);

		

	});	

}

function readCard(card, deckKey, key){
	var cardRef = firebase.database().ref(user+"/"+deckKey+"/"+key).orderByKey();
	console.log(cardRef);
	
	
	downloadCardImage(key, card);

	cardRef.once("value").then(function (snapshot) {

		snapshot.forEach(function (childSnapshot) {
			console.log("datacard");
 			var childkey=childSnapshot.key;
 			var key = snapshot.key;


			var data = childSnapshot.val();
			

			if(childkey == "cardtext"){
				card.text.value = data;
			}
			if(childkey == "drawn"){
				if(data == "true"){
					console.log("carddrawn readwefewfwefwef" );
			
				card.drawn = "true";
				var handCard = new HandCard(this,card);
				

				handCards.push(handCard);
				card.deck.drawnCards.push(card);
				console.log("card " + card.drawn);
				card.image.style.opacity = 0.2;
				card.cardObject.className = "cardDrawn";
				card.deleteCard.style.display = "none";
				
				card.deck.cards.splice(card.deck.cards.indexOf(card),1);
				downloadDrawnCardImage(key, card, handCard);
				}
			}
		})
	});
	
	

	
}



var cardFrontBackground = "url(./img/Cf1yelor.png)";
var cardBackground = "url(./img/Cb1yelor.png)";
		
		
var background1 = document.getElementById("background1");
background1.onclick=function(){
		
			
	cardFrontBackground = "url(./img/Cf1.png)";
	cardBackground = "url(./img/Cb1.png)";
	for(var j = 0; j< decks.length; j++){
		console.log("deck back");
		decks[j].deckObject.style.backgroundImage = cardBackground;
		for(var i = 0; i < decks[j].cards.length; i++){
			decks[j].cards[i].cardObject.style.backgroundImage = cardFrontBackground;
			console.log("card back");
		}

		for(var i = 0; i < decks[j].drawnCards.length; i++){
			decks[j].drawnCards[i].cardObject.style.backgroundImage = cardFrontBackground;
		}


	}
	console.log("" + handCards.length);
	for(var i = 0; i < handCards.length; i++){
		handCards[i].cardObject.style.backgroundImage = cardFrontBackground;
	}
}

var background2 = document.getElementById("background2");
	background2.onclick=function(){
		
			
	cardFrontBackground = "url(./img/Cf1yelor.png)";
	cardBackground = "url(./img/Cb1yelor.png)";
	for(var j = 0; j< decks.length; j++){
		console.log("deck back");
		decks[j].deckObject.style.backgroundImage = cardBackground;
		for(var i = 0; i < decks[j].cards.length; i++){
			decks[j].cards[i].cardObject.style.backgroundImage = cardFrontBackground;
			console.log("card back");
		}
		for(var i = 0; i < decks[j].drawnCards.length; i++){
			decks[j].drawnCards[i].cardObject.style.backgroundImage = cardFrontBackground;
		}
	}

	for(var i = 0; i < handCards.length; i++){
		handCards[i].cardObject.style.backgroundImage = cardFrontBackground;
	}
}

var background3 = document.getElementById("background3");
background3.onclick=function(){
	console.log("deck back");
			
	cardFrontBackground = "url(./img/CfYugioh.png)";
	cardBackground = "url(./img/CbYugioh.png)";
	for(var j = 0; j< decks.length; j++){
		decks[j].deckObject.style.backgroundImage = cardBackground;
		for(var i = 0; i < decks[j].cards.length; i++){
			decks[j].cards[i].cardObject.style.backgroundImage = cardFrontBackground;
			console.log("card back");
		}
		for(var i = 0; i < decks[j].drawnCards.length; i++){
			decks[j].drawnCards[i].cardObject.style.backgroundImage = cardFrontBackground;
		}
	}
	console.log(handCards.length + "handCards");
	for(var i = 0; i < handCards.length; i++){
		handCards[i].cardObject.style.backgroundImage = cardFrontBackground;
	}
}




function addNewDeck(){
	if(decks.length < 10){
		var newDeck = new Deck();
		decks.push(newDeck);
	}
}

function flipIn(element, child0) {
  var w = 0;
  
  element.style.width = w+ 'px';

  
  if(child0)
    child0.style.opacity = 0;
  
  var id = setInterval(frame, 0.1);

  function frame() {
    if (element.style.width == "120px") {
      clearInterval(id);
      child0.style.opacity = 1;

    } else {
      w++;

      
      element.style.width = w + 'px';
      
    }
  }
}



class Deck {
	constructor(key,textValue,cardKeys){

		var deckRow = document.createElement("tr");	
		
		this.deckRow = deckRow;
		deckRow.style.transition = "0.2s";
		
		for(var i = 0; i < decks.length; i++){
				
				decks[i].deckRow.style.display = "none";
			}
			
			deckRow.style.display = "block";
			
	

		var deckCell = document.createElement("td");
		deckCell.className = "cell";
		var deckObject = document.createElement("div");
		
		deckObject.className = "deck";
		deckObject.style.backgroundImage = cardBackground;
	
		

		

		var deckInput = document.createElement("INPUT");
		deckInput.className="textInput";
		deckInput.placeholder = "Add Text";



		
		var addCardButton = document.createElement("INPUT");
		addCardButton.type = "button";
		addCardButton.value = "Add Card";
		addCardButton.className = "button";

		var deleteButton = document.createElement("INPUT");
		deleteButton.type = "button";
		deleteButton.value = "x";
		deleteButton.className = "deleteDeckButton";
		
		var drawButton = document.createElement("INPUT");
		drawButton.type = "button";
		drawButton.value = "draw card";
		drawButton.className = "drawButton";

		var deckListCell = document.createElement("div");
		
		deckListCell.style.display = "inline-block";
		
		
		var deckListText = document.createElement("INPUT");
		deckListText.type = "text";
		
		
		
		deckListText.placeholder = "Add Text";
		if(textValue){
			deckListText.value = textValue;
		}
			
		
		deckListText.className = "button";
		deckListText.width = "120px";

		deckListCell.appendChild(deckListText);
		deckListCell.appendChild(deleteButton);
		deckList.appendChild(deckListCell);

		deckObject.appendChild(deckInput);
		deckCell.appendChild(deckObject);
		deckRow.appendChild(deckCell);
		deckTable.appendChild(deckRow);

		
		deckCell.appendChild(addCardButton);
		deckObject.appendChild(drawButton);
		

		var cardContainerCell = document.createElement("td");
		 
		
		var cardContainer = document.createElement("div");
		cardContainerCell.appendChild(cardContainer);
		cardContainerCell.className = "cell";

		cardContainer.className = "cardContainer";

		deckRow.appendChild(cardContainerCell);

		var selectBackgroundButton = document.createElement("INPUT");
		selectBackgroundButton.type = "button";
		selectBackgroundButton.className = "button";
		selectBackgroundButton.value = "Choose Back";
		deckCell.appendChild(selectBackgroundButton);

		this.cardContainer = cardContainer;


		var cards = [];
		var drawnCards = [];
	
		
		this.cards = cards;
		this.drawnCards = drawnCards;
		
		this.deckObject = deckObject;

		var deck = this;
		this.deckListCell = deckListCell;
		this.text = deckInput;
		this.deckRow = deckRow;
		
		
		this.key = key;
		if(!key){
			this.key = addDeckData(this,user);
		}
		if(cardKeys){
			this.text.value = textValue;
			for(var i = 0; i < cardKeys.length; i++){
				var oldCard =  new Card(deck,cardKeys[i]);
				cards.push(oldCard);
			}
		}

		var selectBackground = document.getElementById("select_background");
		 
		selectBackgroundButton.onclick = function(){
			
			selectBackground.style.display = "block"; 
		}

		selectBackground.onclick= function(){
			selectBackground.style.display = "none"; 
		}


		


		flipIn(deckObject, deckInput,addCardButton, drawButton);
		

		deckInput.onkeyup = function(event){
			event.preventDefault();
    		
        		updateDeckData(deck,user);
        		
        		deckListText.value = "" + deckInput.value;
    			
		}

		deckListText.onkeyup = function(event){
			event.preventDefault();
    		
        		updateDeckData(deck,user);
        		
        		deckInput.value = "" + deckListText.value;
    			
		}

		addCardButton.onclick = function(){
			if(cards.length < 40){
				var newCard =  new Card(deck);

				cards.push(newCard);
				console.log("card drawn");
				newCard.text.placeholder = "Add Text";
			}
		}

		deleteButton.onclick = function(){
			deckTable.removeChild(deckRow);
			deckList.removeChild(deckListCell);
			deleteDeckData(deck,user);

		}

		drawButton.onmouseenter = function(){
			var back = document.getElementById("dark_background");
			back.style.display = "block";
		}

		drawButton.onmouseleave = function(){
			var back = document.getElementById("dark_background");
			back.style.display = "none";
		}
		
		drawButton.onclick = function(){
			if(cards.length > 0){
				var index = Math.floor(cards.length*Math.random());
				cards[index].drawn = "true";
				var handCard = new HandCard(this,cards[index]);
				handCards.push(handCard);
				drawnCards.push(cards[index]);
				cards[index].image.style.opacity = 0.2;
				cards[index].cardObject.className = "cardDrawn";
				cards[index].deleteCard.style.display = "none";
				updateCardData(cards[index],user);
				cards.splice(index,1);
				console.log("cardDrawn " + handCards.length);

				
			}
			else{
				console.log("all drawn");
			}
		}	

		deckListText.onclick = async function(){
			if(deckRow.style.display == "none"){
			for(var i = 0; i < decks.length; i++){
				
				
				decks[i].deckRow.style.display = "none";
			}
			
			deckRow.style.display = "block";
			flipIn(deckObject, deckInput,addCardButton, drawButton);
			for(var i = 0; i < cards.length; i++){
				cards[i].cardObject.style.width = "0px";
				cards[i].cardInput.style.opacity = 0;
				
			}
			for(var i = 0; i < cards.length; i++){
				
				await flipIn(cards[i].cardObject, cards[i].cardInput);
				await pause(100);
				
			}

		
			}
			
			
		}

		



	}
}

const pause = time => new Promise(resolve => setTimeout(resolve, time))



class Card {

	constructor(deck, key){
		

		var cardInput = document.createElement("INPUT");
		cardInput.className="textInput";
		cardInput.type = "text";
		cardInput.placeholder = "Add Text ";

		var cardCell = document.createElement("td");
		cardCell.className = "cell";

		var cardObject = document.createElement("div")
		cardObject.className = "card";
		cardObject.style.backgroundImage = cardFrontBackground;
		

		var deleteCard = document.createElement("INPUT");
		deleteCard.type = "button";
		deleteCard.value = "Delete";	
		deleteCard.className = "button";


		var imageUpload = document.createElement("INPUT");
		imageUpload.type = "file";
		imageUpload.id = "image" + key;
		imageUpload.accept = ".png, .jpg, .jpeg, .gif, .bmp";
		imageUpload.style.width = "120px";
		imageUpload.style.display = "none";
		
		


		var imageObject = document.createElement("img");
		imageObject.className = "cardImage";
		imageObject.src = "img/empty.png"


		cardObject.appendChild(cardInput);
		cardObject.appendChild(imageObject);

		

		cardCell.appendChild(cardObject);
		cardCell.appendChild(imageUpload);
		
		cardCell.appendChild(deleteCard);
		
		deck.cardContainer.appendChild(cardCell);
		
		


		this.cardObject = cardObject;
		this.deleteCard = deleteCard;
		this.deck = deck;
		this.text = cardInput;
		this.key = key;
		this.drawn = "false";
		

	

		this.image = imageObject;

		if(!key){
			this.key = addCardData(this,user);
			console.log("newCard");
		}
		else{
			readCard(this,deck.key, key);
			console.log("readCard");
		}
		


		var card = this;

		this.cardInput = cardInput;
	
		this.imageUpload = imageUpload;
		flipIn(cardObject, cardInput);



		deleteCard.onclick = function(){
			deleteCard.parentNode.remove();
			deleteCardData(card,user);
			var index = deck.cards.indexOf(this);
			var drawnIndex = deck.drawnCards.indexOf(this);
			
			if(index > -1){
				deck.cards.splice(index,1);
			}
			if(drawnIndex > -1){
				deck.drawnCard[drawnIndex].drawnCardCell.remove();
				deck.drawnCards.splice(drawnIndex,1);
			}			
		}

		imageObject.onclick = function(){
			imageUpload.click();
		}

		cardInput.onkeyup = function(event){
			event.preventDefault();
    		console.log("cardData update");
        		updateCardData(card,user);	
    		
		}	

		imageUpload.addEventListener('change', function(event){
			uploadCardImage(imageUpload.files[0],key, imageObject );

			imageObject.style.display="block";
		});

	}
	
}

class HandCard {

	constructor(deck, card){
		this.card = card;

		var cell = document.createElement("td");
		var cardObject = document.createElement("div");
		cell.className = "cell";
		cardObject.className = "card";
		cardObject.style.backgroundImage=cardFrontBackground;

		
		

		cardObject.style.zIndex=2;
		cardObject.style.position = "relative";

		this.cell = cell;
		this.cardObject = cardObject;
		var text = card.text.value;
		if(text == ""){
			text = card.text.placeholder;
		}


		
		var cardText = document.createElement("INPUT");
		cardText.type = "text";
		
		cardText.className = "textInput";
		cardText.value = text;
		cardObject.appendChild(cardText);


		var image =document.createElement("img")

		image.src = card.image.src;
		image.className = "cardImage";
		cardObject.appendChild(image);
		//console.log(card.image.src.length + " ");
		if(card.image.src.length  > 0){
			image.style.display = "block";
		}
		else {
			image.style.display = "none";
		}


		cell.appendChild(cardObject);
		hand.appendChild(cell);

		var discard = document.createElement("INPUT");
		discard.type = "button";
		discard.value = "Discard";
		discard.className="button";
		cell.appendChild(discard);

		

		this.cardText = cardText;
		this.discard = discard;
		this.image = image;
		flipIn(cardObject,cardText, discard);


		discard.onclick = function(){
			card.deleteCard.style = "button";
			card.drawn = "false";
			updateCardData(card,user)
		    
			card.deck.cards.push(card);
			card.cardObject.className = "card";
			card.image.style.opacity = 1;
			
			
			
			
			discard.parentNode.remove();

			var index = handCards.indexOf(this)
			handCards.splice(index,1);

			var index = card.deck.drawnCards.indexOf(card)
			card.deck.drawnCards.splice(index,1);



		}
		
	}

}



