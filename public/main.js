function adddata(){
var pnum = document.getElementById("p_num").value;
 var p_company = document.getElementById("company").value;
 var pName = document.getElementById("p_name").value;
 var p_price= document.getElementById("price").value;
var new_prod = "p" + pnum;
var ref1 = firebase.database().ref("products/" + new_prod );
ref1.set({
 company :p_company ,
 name :pName,
 price : p_price
});
}


//add deck, add option, edit deck, edit option, draw card

// [deck input] (add deck) {deck1, deck2, deck3}

// [deck 1] (delete) (draw)

//edit deck {

// [card] (add card)

//[card] (delete) }