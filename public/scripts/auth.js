// Tab js start
document.getElementById("defaultOpen").click();

function openLogin(evt, tabName) {

  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
} 
// Tab js end

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = signupForm['signup-email'].value;
	const password = signupForm['signup-password'].value;

	if (email === "")
	{
		alert('Please type email.')
	}
	else if (password === "")
	{
		alert('Please type password.')
	}
	else
	{
		auth.createUserWithEmailAndPassword(email, password).then(cred => {
		console.log(cred);
		console.log(cred.user);
		const modal = document.querySelector('#cards-signup');
		//M.Modal.getInstance(modal).close();
		alert('Account Registered.');
		

		}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorMessage + " error");
	
	   		alert(errorMessage);
		
		console.log(error);
		console.log(cred);
		console.log(cred.user);
		const modal = document.querySelector('#cards-signup');
		signupForm.reset();
		});
	}
})

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
	e.preventDefault();
	auth.signOut().then(() => {
		console.log('user signed out');
		loggedOut();
	});
})

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = loginForm['login-email'].value;
	const password = loginForm['login-password'].value;

	

	if (email === "")
	{
		alert('Please type email.')
	}
	else if (password === "")
	{
		alert('Please type password.')
	}
	else
	{
		auth.signInWithEmailAndPassword(email, password).then(cred => {
		console.log(cred);
		console.log(cred.user);
		//loggedIn(cred.user);

		const modal = document.querySelector('#cards-login');
		//M.Modal.getInstance(modal).close();
		loginForm.reset();

		var user = firebase.auth().currentUser;

		
		if(user != null){
		console.log("signed in " + user.uid);
		loggedIn(user.uid);
		}
		}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		if ( errorCode != '' || errorCode != "" ) {
		   	alert(errorMessage);
		}
		console.log(error);
		});
	}
})