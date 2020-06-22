
var user = "";
var decks = [];
var handCards = [];


//html elements
var deckTable = document.getElementById("decks");
var hand = document.getElementById("hand");
var deckList = document.getElementById("deckList");

var cardTable = document.getElementById("card_table");
cardTable.style.display = "none";
cardTable.style.display = "block";
login_registration.style.display = "block";
login_registration.style.display = "none";

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
			
		})
	});

	

	
}




function addNewDeck(){
	if(decks.length < 10){
		decks.push(new Deck());
	}
}

function flipIn(element, child0, child1, child2) {
  var w = 0;
  var o = 0;
  element.style.width = w+ 'px';
  //cardElement.style.opacity = o;
  
  if(child0)
    child0.style.opacity = o;
  /*if(child1)
  	child1.style.opacity = o;
  if(child2)
  	child2.style.opacity = o;
  */
  var id = setInterval(frame, 0.1);

  function frame() {
    if (element.style.width == "120px") {
      clearInterval(id);
      

    } else {
      w++;

      if(w > 100){
      	o=Math.sqrt(w/120);
    	//cardElement.style.opacity = o;
    	if(child0)
    		child0.style.opacity = o;
    	//if(child1)
    		//child1.style.opacity = o;
    	//if(child2)
    		//child2.style.opacity = o;
  	  }
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
		drawButton.className = "button";

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
		deckCell.appendChild(drawButton);
		

		var cardContainerCell = document.createElement("td");
		 
		
		var cardContainer = document.createElement("div");
		cardContainerCell.appendChild(cardContainer);
		cardContainerCell.className = "cell";

		cardContainer.className = "cardContainer";

		deckRow.appendChild(cardContainerCell);

		this.cardContainer = cardContainer;


		var cards = [];
		var drawnCards = [];
		var handCards = [];
		
		this.cards = cards;
		this.drawnCards = drawnCards;
		this.handCards = handCards;

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
			
				newCard.text.placeholder = "your option";
			}
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
				handCards.push(new HandCard(this,cards[index]));
				drawnCards.push(cards[index]);
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
			flipIn(deckObject, deckInput,addCardButton, drawButton);
			for(var i = 0; i < cards.length; i++){
				flipIn(cards[i].cardObject, cards[i].cardInput, cards[i].upload, cards[i].imageUpload);
			}
			for(var i = 0; i < drawnCards.length; i++){
				flipIn(drawnCards[i].cardObject, drawnCards[i].cardInput, drawnCards[i].upload, drawnCards[i].imageUpload);
			}
			
			
		}
	}
}



class Card {

	constructor(deck, key){

		var cardInput = document.createElement("INPUT");
		cardInput.className="textInput";
		cardInput.type = "text";
		cardInput.placeholder = "your option ";

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
		imageUpload.className = "button";
		imageUpload.style.width="90px";
		
		//imageUpload.style.height="14px";
		/*
		var inputLabel = document.createElement("LABEL");
		inputLabel.htmlFor = imageUpload;
		inputLabel.innerHTML = "choose image";
		inputLabel.className = "button";
		imageUpload.appendChild(inputLabel);*/
		

		

	

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

		if(!key){
			this.key = addCardData(this,user);
		}
		else{
			readCard(this,deck.key, key);
		}
		


		var card = this;

		this.cardInput = cardInput;
		this.upload = upload;
		this.imageUpload = imageUpload;
		flipIn(cardObject, cardInput, upload,imageUpload);



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

class HandCard {

	constructor(deck, card){
		this.card = card;

		var cell = document.createElement("td");
		var handCard = document.createElement("div");
		cell.className = "cell";
		handCard.className = "card";
		this.cell = cell;
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



