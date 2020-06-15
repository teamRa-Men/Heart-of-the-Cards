var fhRef = firebase.database().ref("cards").orderByKey();

var primaryKey = 0;

fhRef.once("value").then(function (snapshot) {
 snapshot.forEach(function (childSnapshot) {
 	primaryKey = parseInt(childSnapshot.key)+1;
 });
});



function adddata(){

 var cardText = document.getElementById("card_text").value;
if(cardText != ""){

 //var cardImage = document.getElementById("card_image").value;
 
var ref = firebase.database().ref("cards/" + primaryKey);
primaryKey = primaryKey + 1;

ref.set({
 text :cardText
});
}
}



//add deck, add option, edit deck, edit option, draw card

// [deck input] (add deck) {deck1, deck2, deck3}

// [deck 1] (delete) (draw)

//edit deck {

// [card] (add card)

//[card] (delete) }