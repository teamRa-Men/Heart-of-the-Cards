
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
		handCards[i].handCard.remove();
	}
	handCards = [];
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
			
		}
		else{
			d.deckRow.style.display = "block";
			
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
			
		})
	});

	

	
}

var cardFrontBackground = "url(./img/Cf1yelor.png)";
var cardBackground = "url(./img/Cb1yelor.png)";
		
		
var background1 = document.getElementById("background1");
background1.onclick=function(){
		
	cardFrontBackground = "url(./img/Cf1.png)";
	for(var j = 0; j< decks[j].decks.length; j++){
	console.log("deck back");
		decks[j].style.backgroundImage = "url(./img/Cb1.png)";
		cardBackground = "url(./img/Cb1.png)";
		for(var i = 0; i < decks[j].cards.length; i++){
			decks[j].cards[i].cardObject.style.backgroundImage = cardFrontBackground;
			console.log("card back");
		}
		for(var i = 0; i < drawnCards.length; i++){
			decks[j].drawnCards[i].cardObject.style.backgroundImage = cardFrontBackground;
		}
	}
}

var background2 = document.getElementById("background2");
	background2.onclick=function(){
		
			
	cardFrontBackground = "url(./img/Cf1yelor.png)";
	cardBackground = "url(./img/Cb1yelor.png)";
	for(var j = 0; j< decks.length; j++){
		console.log("deck back");
		decks[j].deckObject.style.backgroundImage = "url(./img/Cb1yelor.png)";
		for(var i = 0; i < decks[j].cards.length; i++){
			decks[j].cards[i].cardObject.style.backgroundImage = cardFrontBackground;
			console.log("card back");
		}
		for(var i = 0; i < decks[j].drawnCards.length; i++){
			decks[j].drawnCards[i].cardObject.style.backgroundImage = cardFrontBackground;
		}
	}
}

var background3 = document.getElementById("background3");
background3.onclick=function(){
	console.log("deck back");
			
	cardFrontBackground = "url(./img/CfYugioh.png)";
	cardBackground = "url(./img/CbYugioh.png)";
	for(var j = 0; j< decks.length; j++){
		decks[j].deckObject.style.backgroundImage = "url(./img/CbYugioh.png)";
		for(var i = 0; i < decks[j].cards.length; i++){
			decks[j].cards[i].cardObject.style.backgroundImage = cardFrontBackground;
			console.log("card back");
		}
		for(var i = 0; i < decks[j].drawnCards.length; i++){
			decks[j].drawnCards[i].cardObject.style.backgroundImage = cardFrontBackground;
		}
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
		deckInput.placeholder = "your question";


		
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
		drawButton.className = "drawButton";

		var deckListCell = document.createElement("div");
		
		deckListCell.style.display = "inline-block";
		
		
		var deckListText = document.createElement("INPUT");
		deckListText.type = "text";
		deckListText.width="0px";
		
		
		deckListText.placeholder = "your question";
		
		
		deckListText.className = "button";

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
		selectBackgroundButton.value = "choose back";
		deckCell.appendChild(selectBackgroundButton);

		this.cardContainer = cardContainer;


		var cards = [];
		var drawnCards = [];
		var handCards = [];
		
		this.cards = cards;
		this.drawnCards = drawnCards;
		this.handCards = handCards;
		this.deckObject = deckObject;

		var deck = this;
		this.deckListCell = deckListCell;
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
				var newCard =  new Card(deck, key, cardFrontBackground);
				cards.push(newCard);
				console.log("card drawn");
				newCard.text.placeholder = "your option";
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
				handCards.push(new HandCard(this,cards[index],cardFrontBackground));
				drawnCards.push(cards[index]);
				cards[index].image.style.opacity = 0.2;
				cards[index].cardObject.className = "cardDrawn";
				cards[index].deleteCard.style.display = "none";
				cards.splice(index,1);
				
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

	constructor(deck, key, back){
		console.log(back);

		var cardInput = document.createElement("INPUT");
		cardInput.className="textInput";
		cardInput.type = "text";
		cardInput.placeholder = "your option ";

		var cardCell = document.createElement("td");
		cardCell.className = "cell";

		var cardObject = document.createElement("div")
		cardObject.className = "card";
		cardObject.style.backgroundImage = back;
		

		var deleteCard = document.createElement("INPUT");
		deleteCard.type = "button";
		deleteCard.value = "delete";	
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
		}
		else{
			readCard(this,deck.key, key);
		}
		


		var card = this;

		this.cardInput = cardInput;
	
		this.imageUpload = imageUpload;
		flipIn(cardObject, cardInput);



		deleteCard.onclick = function(){
			deleteCard.parentNode.remove();
			deleteCardData(card);
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
    		if (event.keyCode === 13) {
        		updateCardData(card,user);	
    		}
		}	

		imageUpload.addEventListener('change', function(event){
			uploadCardImage(imageUpload.files[0],key, imageObject );

			imageObject.style.display="block";
		});

	}
	
}

class HandCard {

	constructor(deck, card, back){
		this.card = card;

		var cell = document.createElement("td");
		var handCard = document.createElement("div");
		cell.className = "cell";
		handCard.className = "card";
		handCard.style.backgroundImage=back;

		handCard.backgroundImage = card.backgroundImage;
		

		handCard.style.zIndex=2;
		handCard.style.position = "relative";

		this.cell = cell;
		this.handCard = handCard;
		var text = card.text.value;
		if(text == ""){
			text = card.text.placeholder;
		}


		
		var cardText = document.createElement("INPUT");
		cardText.type = "text";
		
		cardText.className = "textInput";
		cardText.value = text;
		handCard.appendChild(cardText);


		var showImage =document.createElement("img")
		showImage.src = card.image.src;
		showImage.className = "cardImage";
		handCard.appendChild(showImage);
		//console.log(card.image.src.length + " ");
		if(card.image.src.length  > 0){
			showImage.style.display = "block";
		}
		else {
			showImage.style.display = "none";
		}


		cell.appendChild(handCard);
		hand.appendChild(cell);

		var discard = document.createElement("INPUT");
		discard.type = "button";
		discard.value = "discard";
		discard.className="button";
		cell.appendChild(discard);

		

		this.cardText = cardText;
		this.discard = discard;
		flipIn(handCard,cardText, discard);


		discard.onclick = function(){
			card.deleteCard.style.display = "block";
			card.drawn = "false";
			
		    
			card.deck.cards.push(card);
			card.cardObject.className = "card";
			card.image.style.opacity = 1;
			
			
			
			
			discard.parentNode.remove();

			var index = card.deck.handCards.indexOf(this)
			card.deck.handCards.splice(index,1);

			var index = card.deck.drawnCards.indexOf(card)
			card.deck.drawnCards.splice(index,1);



		}
		
	}

}



