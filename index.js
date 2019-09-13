
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
    var days = get_days_to_pool();
    const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
    promise.catch(e => window.alert(e.message));
    saveInformation(firstName, lastName, email, password, phoneNum, gender, firstAddress, secondAddress,
        city, state, zip, days);
}

function getInputVal(id) {
    return document.getElementById(id).value;
}

function saveInformation(firstName, lastName, email, password, phoneNum, gender, firstAddress, secondAddress,
                         city, state, zip, days) {
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
        DaysToPool: days
    });
}

function get_days_to_pool() {
    var darray = new Array(7);

    if(document.getElementById("monday").checked) {
        darray[0] = document.getElementById("monday").value;
    } else {
        darray[0] = "";
    }

    if(document.getElementById("tuesday").checked) {
        darray[1] = document.getElementById("tuesday").value;
    } else {
        darray[1] = "";
    }

    if(document.getElementById("wednesday").checked) {
        darray[2] = document.getElementById("wednesday").value;
    } else {
        darray[2] = "";
    }

    if(document.getElementById("thursday").checked) {
        darray[3] = document.getElementById("thursday").value;
    } else {
        darray[3] = "";
    }

    if(document.getElementById("friday").checked) {
        darray[4] = document.getElementById("friday").value;
    } else {
        darray[4] = "";
    }

    if(document.getElementById("saturday").checked) {
        darray[5] = document.getElementById("saturday").value;
    } else {
        darray[5] = "";
    }

    if(document.getElementById("sunday").checked) {
        darray[6] = document.getElementById("sunday").value;
    } else {
        darray[6] = "";
    }

    var days = "";
    for(var i = 0; i < 7; i++) {
        if(darray[i] == "") {
            continue;
        }
        days += " " + darray[i];
    }
    return days.substring(1);
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
        window.location.href = "SearchPage.html";
    } else {
        // console.log('Not Logged In!');
        // window.alert("Email or Password incorrect !");
    }
});
