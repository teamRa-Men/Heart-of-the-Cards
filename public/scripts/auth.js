const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = signupForm['signup-email'].value;
	const password = signupForm['signup-password'].value;

	auth.createUserWithEmailAndPassword(email, password).then(cred => {
		console.log(cred);
		console.log(cred.user);
		const modal = document.querySelector('#cards-signup');
		//M.Modal.getInstance(modal).close();

		signupForm.reset();
	})
	console.log(auth);
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
		else {
			console.log("incorrect login credentials");
		}

	})
})