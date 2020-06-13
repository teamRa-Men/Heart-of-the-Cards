
var fhRef = firebase.database().ref("products").orderByKey();
//html elements
var body = document.getElementsByTagName("body")[0];
var tbl = document.createElement('table'); // create table element
var tblBody = document.createElement("tbody"); // create table body element
var row = document.createElement("tr"); // create row
var th1 = document.createElement('th'); // create header cell
var th2 = document.createElement('th');
var th3 = document.createElement('th');
th1.appendChild(document.createTextNode("Company")); // add data to header cell
th2.appendChild(document.createTextNode("Name"));
th3.appendChild(document.createTextNode("Price"));
row.appendChild(th1); // add header to row
row.appendChild(th2);
row.appendChild(th3);
tblBody.appendChild(row); // add row to table body
fhRef.once("value").then(function (snapshot) {
 snapshot.forEach(function (childSnapshot) {
 var key=childSnapshot.key;
 var childData = childSnapshot.val();
 var data = childSnapshot.val();
 // console.log(data.company);
 var row = document.createElement("tr");
 var td1 = document.createElement('td');
 var td2 = document.createElement('td');
 var td3 = document.createElement('td');
 td1.appendChild(document.createTextNode(data.company));
 td2.appendChild(document.createTextNode(data.name));
 td3.appendChild(document.createTextNode(data.price));
 row.appendChild(td1);
 row.appendChild(td2);
 row.appendChild(td3);
 tblBody.appendChild(row);
 });
});
tbl.appendChild(tblBody);
body.appendChild(tbl);
tbl.setAttribute("border", "2");



