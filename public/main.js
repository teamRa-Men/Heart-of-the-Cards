var fhRef = firebase.database().ref("/user").orderByKey();

function addDeckData(deck){
	console.log("deck adding to database");
	var deckText = deck.text.value;

	var key = firebase.database().ref("/user").push({
		decktext: deckText
		//user_key:;
		//deck_key:;
	}).key;
	console.log("deck " + key);
	return key;
}

function updateDeckData(deck){
	console.log("updating deck to database");
	var deckText = deck.text.value;
	firebase.database().ref("/user"+"/"+deck.key).set({
		decktext :deckText
		//user_key:;
		//deck_key:;
	});

}

function deleteDeckData(deck){
	firebase.database().ref("/user"+"/"+deck.key).remove();
}

function addCardData(card){
	console.log("card adding to database");
	var cardText = card.text.value;
	var key = firebase.database().ref("/user"+"/"+card.deck.key).push({
		cardtext :cardText
		//user_key:;
		//deck_key:;
	}).key;
	return key;
}

function updateCardData(card){
	console.log("updating card to database");
	var cardText = card.text.value;

	firebase.database().ref("/user"+"/"+card.deck.key+"/"+card.key).set({
		cardtext :cardText
		//user_key:;
		//deck_key:;
	});
}

function deleteCardData(card){
	firebase.database().ref("/user"+"/"+card.deck.key+"/"+card.key).remove();
}



//add deck, add option, edit deck, edit option, draw card

// [deck input] (add deck) {deck1, deck2, deck3}

// [deck 1] (delete) (draw)

//edit deck {

// [card] (add card)

//[card] (delete) }