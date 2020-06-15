
var fhRef = firebase.database().ref("cards").orderByKey();
//html elements
var body = document.getElementsByTagName("body")[0];
var tbl = document.createElement('table'); // create table element
var tblBody = document.createElement("tbody"); // create table body element
var row = document.createElement("tr"); // create row
var th1 = document.createElement('th'); // create header cell
var th2 = document.createElement('th');

th1.appendChild(document.createTextNode("Card")); // add data to header cell

row.appendChild(th1); // add header to row
row.appendChild(th2);

tblBody.appendChild(row); // add row to table body


let options = [];


fhRef.once("value").then(function (snapshot) {
 snapshot.forEach(function (childSnapshot) {
 var key=childSnapshot.key;
 var childData = childSnapshot.val();
 var data = childSnapshot.val();
 // console.log(data.company);
 var row = document.createElement("tr");
 var td1 = document.createElement('td');
 var td2 = document.createElement('td');

 options.push(data.text);
 td1.appendChild(document.createTextNode(data.text));

 var removeBtn = document.createElement("button");
 removeBtn.id = key+"";
 removeBtn.innerHTML = 'remove ' + key;
 
 removeBtn.onclick = function(){
 	console.log(removeBtn.id);
 	snapshot.forEach(function (child) {
 		var childKey =child.key;
 		if(key === childKey){
 			child.getRef().remove();
 			console.log(childKey + "remove");

 			const i = options.indexOf(child.val().text);
			if (i > -1) {
  				options.splice(i, 1);
			}
 		}
 	});


 	removeBtn.remove();
 	td1.remove();
 	row.remove();
	
 }

 td2.appendChild(removeBtn);

 row.appendChild(td1);
 row.appendChild(td2);

 tblBody.appendChild(row);
 });
});
tbl.appendChild(tblBody);
body.appendChild(tbl);

function drawCard(){
	fhRef.once("value").then(function (snapshot) {
		if(options.length > 0){
		var draw = Math.floor(Math.random()*options.length);
		console.log(draw + " " + options[draw]);
		document.getElementById("drawn_card").innerHTML = options[draw];
		}
		else{
			document.getElementById("drawn_card").innerHTML = "<br>";
		}
 	});
}

