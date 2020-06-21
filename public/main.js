

function addDeckData(deck,user){
	console.log("deck adding to database");
	var deckText = deck.text.value;

	var key = firebase.database().ref("/"+user).push({
		decktext: deckText
		//user_key:;
		//deck_key:;
	}).key;
	console.log("deck " + key);
	return key;
}

function updateDeckData(deck,user){
	console.log("updating deck to database");
	var deckText = deck.text.value;
	firebase.database().ref("/"+user+"/"+deck.key).set({
		decktext :deckText
		//user_key:;
		//deck_key:;
	});

}

function deleteDeckData(deck,user){
	firebase.database().ref("/"+user+"/"+deck.key).remove();
}

function addCardData(card,user){
	console.log("card adding to database");
	var cardText = card.text.value;
	//var cardDrawn = card.drawn;

	var key = firebase.database().ref("/"+user+"/"+card.deck.key).push({
		cardtext :cardText,
		//drawn: cardDrawn
	}).key;
	return key;
}

function updateCardData(card,user){
	console.log("updating card to database");
	var cardText = card.text.value;
	var cardDrawn = card.drawn;

	firebase.database().ref("/"+user+"/"+card.deck.key+"/"+card.key).update({
		cardtext :cardText,
		drawn: cardDrawn
	});
}

function deleteCardData(card,user){
	firebase.database().ref("/"+user+"/"+card.deck.key+"/"+card.key).remove();
}

function uploadCardImage(file, key, imageObject){
	ref = firebase.storage().ref("/"+key);
	var name = "image";
	var task = ref.child(name).put(file)
	.then(snapshot => snapshot.ref.getDownloadURL())
	.then(url => imageObject.src = url)
}

function downloadCardImage(key, card){
	
	ref = firebase.storage().ref("/"+key+"/image");
	ref.getDownloadURL()
	.then(function(url){
		card.image.src = url;
		if(url.length  > 0){
			card.image.style.display = "block";
		}
		else {
			card.image.style.display = "none";
		}
		
		
	})
	
	
}



//add deck, add option, edit deck, edit option, draw card

// [deck input] (add deck) {deck1, deck2, deck3}

// [deck 1] (delete) (draw)

//edit deck {

// [card] (add card)

//[card] (delete) }