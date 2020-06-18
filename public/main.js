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
	var cardDrawn = card.drawn;

	var key = firebase.database().ref("/user"+"/"+card.deck.key).push({
		cardtext :cardText,
		drawn: cardDrawn
	}).key;
	return key;
}

function updateCardData(card){
	console.log("updating card to database");
	var cardText = card.text.value;
	var cardDrawn = card.drawn;

	firebase.database().ref("/user"+"/"+card.deck.key+"/"+card.key).update({
		cardtext :cardText,
		drawn: cardDrawn
	});
}

function deleteCardData(card){
	firebase.database().ref("/user"+"/"+card.deck.key+"/"+card.key).remove();
}

function uploadCardImage(file, key, imageObject){
	ref = firebase.storage().ref("/"+key);
	var name = new Date + '_' + file.name;
	var task = ref.child(name).put(file)
	.then(snapshot => snapshot.ref.getDownloadURL())
	.then(url => imageObject.src = url)
}





//add deck, add option, edit deck, edit option, draw card

// [deck input] (add deck) {deck1, deck2, deck3}

// [deck 1] (delete) (draw)

//edit deck {

// [card] (add card)

//[card] (delete) }