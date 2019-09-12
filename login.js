
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCJLG7KqXqm_7OCwUkEfQ5616MhTcFe6c0",
    authDomain: "testbase-1c88a.firebaseapp.com",
    databaseURL: "https://testbase-1c88a.firebaseio.com",
    projectId: "testbase-1c88a",
    storageBucket: "testbase-1c88a.appspot.com",
    messagingSenderId: "633588180358",
    appId: "1:633588180358:web:c7d621542cfc146f"
};

// Check if firebase is already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const logoutBtn = document.getElementById("logoutBtn");

if(document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", loginToSearch);
}

function loginToSearch(e) {
    e.preventDefault();
    firebase.auth().signOut();
    const email = loginEmail.value;
    const password = loginPassword.value;
    console.log("Email: " + email);
    console.log("Password: " + password);
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
            // Success
            window.location = "SearchPage.html";
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage);
        });
}

if (logoutBtn) {
    // Add log out event
    logoutBtn.addEventListener('click', e => {
        firebase.auth().signOut();
        // window.alert('Successfully Logged Out!');
        window.location = "index.html";
    });
}

// Add a real time listener
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("Logged In!");
        console.log(user);
    } else {
        console.log('Not Logged In!');
    }
});
