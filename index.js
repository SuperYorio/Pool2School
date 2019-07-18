

// Your web app's Firebase configuration
var firebaseConfig = {
    // TODO: Enter your own firebase configuration
};

// Check if firebase is already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

var firebaseRef = firebase.database().ref("Student");
firebase.auth().signOut();


document.getElementById("contactForm").addEventListener("submit", submitForm);


function submitForm(e) {
    e.preventDefault();
    var firstName = getInputVal('firstName');
    var lastName = getInputVal('lastName');
    var email = getInputVal('email');
    var password = getInputVal('password');
    var phoneNum = getInputVal('phoneNum');
    var gender = getInputVal('gender');
    var firstAddress = getInputVal('inputAddress');
    var secondAddress = getInputVal('inputAddress2');
    var city = getInputVal('inputCity');
    var state = getInputVal('inputState');
    var zip = getInputVal('inputZip');
    // var days = getInputVal('daysToPool');
    saveInformation(firstName, lastName, email, password, phoneNum, gender, firstAddress, secondAddress,
        city, state, zip);
    const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
}

function getInputVal(id) {
    return document.getElementById(id).value;
}

function saveInformation(firstName, lastName, email, password, phoneNum, gender, firstAddress, secondAddress,
                         city, state, zip) {
    var childRef = firebaseRef.push();
    childRef.set({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
        PhoneNumber: phoneNum,
        Gender: gender,
        FirstAddress: firstAddress,
        SecondAddress: secondAddress,
        City: city,
        State: state,
        Zip: zip,
        // DaysToPool: days
    });
}


var password = document.getElementById("password")
    , confirm_password = document.getElementById("confirm_password");

function validatePassword() {
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

// Add a real time listener
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("Logged In!");
        console.log(user);
        window.location.href = "SearchPage.html";
    } else {
        console.log('Not Logged In!');
        // window.alert("Email or Password incorrect !");
    }
});
